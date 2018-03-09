import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import stripe from '../../stripeKey';
import logo from '../../images/logo.svg';
import Modal from 'react-modal';
import './step6.css'

const customStyles = {
    content: {
        minheight: "250px",
        borderradius: "6px", 
        position: "absolute",
        top: "60px",
        left: "35%",
        width: "500px",
        height: "40%",
        background: "#c0deed"

    }
}

const progressStyle = {
   content: {
    minheight: "250px",
    borderradius: "6px", 
    position: "absolute",
    top: "60px",
    left: "35%",
    width: "30%",
    height: "30%",
    background: "#c0deed"
   }
}

const successStyle = {
    content: {
        minheight: "250px",
        borderradius: "6px", 
        position: "absolute",
        top: "60px",
        left: "35%",
        width: "30%",
        height: "30%",
        background: "#c0deed"
    }

}

export default class Step6 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
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
        window.location.assign(process.env.REACT_APP_HOME_REDIRECT)
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
        axios.post('/api/payment', {
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
                <div className="title-main-6">
                    <div className="step6BookTitle">Title: {cartLine.book_title}</div>
                    <div className="step6BookSub">Subtitle: {cartLine.book_subtitle}</div>
                </div>
                <div className="price-main-6">
                    <div className="step6BookPrice">Price: ${cartLine.book_price}</div>
                    <div className="step6BookQuantity">Quantity: {cartLine.quantity}</div>
                </div>
                <div>
                    <button className="incrementUp" onClick={() => this.increment("up", cartLine.book_id)}>+</button>
                    <button className="incrementDown" onClick={() => this.increment("down", cartLine.book_id)}>-</button>
                </div>
                <div className="total-main-6"> 
                    <div className="step6BookTotal">Subtotal: </div>
                    <div className="step6BookTotalNumber">${Math.floor(subTotal, -1)}</div>
                </div>
            </div>
        })
        return (
            <div className="stepSixContainer">
                <div className="stepSixCart">
                {cart}
                </div>
                <div className="step6BookTotalComp">Total: ${Math.floor(total, -1)}</div>

                <button className="step6Button" onClick={this.openModal}>Check Out</button>

                < Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                <div className="modal-checkout-container">
                <div className="step6Name">Name: <div>{this.state.user.data.display_name}</div></div>
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
                <div className="stripeCheck">
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey={stripe.pub_key}
                        amount={total * 100}
                        name="your order"
                        description="confirm your order"
                    /></div></div>
                </Modal>
                <Modal isOpen={this.state.progressModalIsOpen} onRequestClose={this.closeProgressModal} style={progressStyle}>
                <div className="progress-modal">
                <img src={logo} className="success-logo"/>
                <div className="progress-tag">please wait while your order is processed</div>
                </div>
                </Modal>
                <Modal isOpen={this.state.successModalIsOpen} onRequestClose={this.closeSucessModal} style={successStyle}>
                <div className="success-modal">
                <img src = {logo} className="success-logo"/>
               <div className="success-tag"> Success! Thank you for your purchase.</div>
                </div>
                </Modal>

            </div>

        )
    }
}

