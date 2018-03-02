import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import stripe from '../../stripeKey';
import logo from '../../images/logo.svg';
import Modal from 'react-modal';

const customStyles = {
    content: {
        width: "50%",
        height: "300px",
        background: "lightblue"

    }
}

const progressStyle = {
   content: {
    width: "45%",
    height: "25%",
    background: "orange"
   }
}

const successStyle = {
    content: {
        width: "50%",
    height: "150px",
    background: "hotpink"
    }

}

export default class Step6 extends Component {
    constructor() {
        super();

        this.state = {
            bookCart: [],
            address: "",
            city: "",
            state: "",
            zipCode: "",
            email: "",
            phone: "",
            total: 0
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.progressModal = this.progressModal.bind(this)
        this.closeProgressModal = this.closeProgressModal.bind(this)
        this.successModal = this.successModal.bind(this)
        this.closeSucessModal = this.closeSucessModal.bind(this)
    }


    //axios call to get cart
    componentDidMount() {
        axios.get("/api/getcart").then(res => {
            this.totalState(res.data)
            this.setState({
                bookCart: res.data,
            })
        })
    }
    increment(key, id) {
        if (key === "up") {
            axios.put(`/api/changequantity/${id}/${1}`).then(res => {
                this.totalState(res.data);
                this.setState({
                    bookCart: res.data
                })
            })
        } else {
            axios.put(`/api/changequantity/${id}/${-1}`).then(res => {
                this.totalState(res.data)
                this.setState({
                    bookCart: res.data
                })
            })
        }
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    progressModal(){
        
        this.setState({
            progressModalIsOpen: true
        })
    }

    closeProgressModal(){
        this.setState({
            progressModalIsOpen: false
        })
    }

    successModal(){
        this.setState({
            successModalIsOpen: true
        })
    }

    closeSucessModal(){
        window.location.assign('/home')
        this.setState({
            successModalIsOpen: false
        })
    }

    update(key, val) {
        this.setState({
            [key]: val

        })
    }

    totalState(res) {
        var total = 0
        var mapped = res.map((element) => {
            var subtotal = element.book_price * element.quantity
            total += subtotal
        })
        this.setState({
            total: total
        })
    }

    



    //stripe axios call
    onToken = (token) => {
        this.progressModal()
        this.closeModal()
        token.card = void 0;
        axios.post('http://localhost:4321/api/payment', {
            token,
            amount: this.state.total,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode,
            email: this.state.email,
            phone: this.state.phone,
            cart: this.state.bookCart
        }).then(response => {
            this.totalState(response.data)
            this.setState({
                bookCart: response.data,
                progressModalIsOpen: false,
                successModalIsOpen: true
            })
            
            

        });
    }

    render() {
        let total = this.state.total
        let cart = this.state.bookCart.map((cartLine, i) => {
            let subTotal = cartLine.book_price * cartLine.quantity;

            return <div className="step6CartLine" key={i}>
                {/* <div className="step6BookImage"><img src = {logo} alt='logo' className='step6Logo'/></div> */}
                <div className="step6BookTitle">{cartLine.book_title}</div>
                <div className="step6BookSub">{cartLine.book_subtitle}</div>
                <div className="step6BookPrice">{cartLine.book_price}</div>
                <div className="step6BookQuantity">{cartLine.quantity}
                    <button className="incrementUp" onClick={() => this.increment("up", cartLine.book_id)}>+</button>
                    <button className="incrementDown" onClick={() => this.increment("down", cartLine.book_id)}>-</button></div>
                <div className="step6BookTotal">{subTotal}</div>

            </div>
        })
        return (
            <div className="stepOneContainer">
                {cart}
                <div className="step6BookTotal">{total}</div>

                <button className="checkout" onClick={this.openModal}>Check it out</button>

                < Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>

                    <div className="modalAddress">Address:
            <div className='addressInput'>
                            <input type="text" onChange={(e) => this.update("address", e.target.value)} />
                        </div>
                    </div>
                    <div className="modalcity">city:
            <div className='cityInput' >
                            <input type="text" onChange={(e) => this.update("city", e.target.value)} />
                        </div>
                    </div>
                    <div className="modalState">State:
            <div className='stateInput'>
                            <input type="text" onChange={(e) => this.update("state", e.target.value)} />
                        </div>
                    </div>
                    <div className="modalZipcode">Zipcode:
            <div className='zipInput'>
                            <input type="text" onChange={(e) => this.update("zipCode", e.target.value)} />
                        </div>
                    </div>
                    <div className="modalEmail">Email:
            <div className='emailInput'>
                            <input type="text" onChange={(e) => this.update("email", e.target.value)} />
                        </div>
                    </div>
                    <div className="modalPhone">Phone:
            <div className='phoneInput'>
                            <input type="text" onChange={(e) => this.update("phone", e.target.value)} />
                        </div>
                    </div>
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey={stripe.pub_key}
                        amount={total * 100}
                        name="your order"
                        description="literally  begging that you confirm this order"
                    />
                </Modal>
                <Modal isOpen={this.state.progressModalIsOpen} onRequestClose={this.closeProgressModal} style={progressStyle}>
                <div className="progress-modal">
                please wait while your order is processed
                </div>
                </Modal>
                <Modal isOpen={this.state.successModalIsOpen} onRequestClose={this.closeSucessModal} style={successStyle}>
                <div className="success-modal">
                that's a damn fine succesful order and I'm rock hard because of it.
                </div>
                </Modal>

            </div>

        )
    }
}

