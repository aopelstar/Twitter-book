import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import stripe from '../stripeKey';
import Modal from 'react-modal';

const customStyles = {
    content: {
        width: "50%",
        height: "300px",
        background: "lightblue"
    }
}

const progressStyle = {
    width: "45%",
    height: "25%",
    background: "orange"
}

const successStyle = {
    width: "50%",
    height: "150px",
    background: "hotpink"

}

export default class Cart extends Component {
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
        this.closeSuccessModal = this.closeSuccessModal.bind(this)
    }


    //axios call to get cart
    componentDidMount(props) {
        var total = 0
        var mapped = this.props.cart.map((element) => {
            var subtotal = element.book_price * element.quantity
            total += subtotal
        })
            this.setState({
                bookCart: this.props.cart,
                total: total
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

    progressModal() {
        this.setState({
            progressModalIsOpen: true
        })
    }

    closeProgressModal() {
        this.setState({
            progressModalIsOpen: false
        })
    }

    successModal() {
        this.setState({
            successModalIsOpen: true
        })
    }

    closeSuccessModal() {
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
                modalIsOpen: false,
                progressModalIsOpen: false,
                successModalIsOpen: true
            })


        });
    }

    render() {
        let total = this.state.total
        let cart = this.state.bookCart.map((cartLine, i) => {
            let subTotal = cartLine.book_price * cartLine.quantity;

            return <div className="accountCartLine" key={i}>
                {/* <div className="accountBookImage"><img src = {logo} alt='logo' className='accountLogo'/></div> */}
                <div className="accountBookTitle">{cartLine.book_title}</div>
                <div className="accountBookSub">{cartLine.book_subtitle}</div>
                <div className="accountBookPrice">{cartLine.book_price}</div>
                <div className="accountBookQuantity">{cartLine.quantity}
                    <button className="incrementUp" onClick={() => this.increment("up", cartLine.book_id)}>+</button>
                    <button className="incrementDown" onClick={() => this.increment("down", cartLine.book_id)}>-</button></div>
                <div className="accountBookTotal">{subTotal}</div>

            </div>
        })
        return (
            <div className="accountCart">
                {cart}
                <div className="accountBookTotal">{total}</div>

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
                    please wait while your order is submitted, you bitch.
                </Modal>
                <Modal isOpen={this.state.successModalIsOpen} onRequestClose={this.closeSuccessModal} style={successStyle}>
                    <div onClick={this.closeSuccessModal}>x</div>
                    Thank you for your order
                </Modal>

            </div>

        )
    }
}

