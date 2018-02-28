import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import stripe from '../../stripeKey';
import logo from '../../images/logo.svg'

export default class Step6 extends Component {
    constructor() {
        super();

        this.state = {
            bookCart: []
        }
    }
    //axios call to get cart
    componentDidMount(){
        axios.get("/api/getcart").then(res => {
            this.setState({
                bookCart: res.data
            })
        })
    }

    

    

    //stripe axios call
    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('http://localhost:4321/api/payment', { token, amount: 100 } ).then(response => {
          alert('we are in business')
        });
      }

    render(){
        let total = 0
        let cart = this.state.bookCart.map((cartLine, i) => {
            let subTotal = cartLine.book_price * cartLine.quantity;
            total += subTotal;
            return <div className="cartLine" key={i}>
            <div className="step6BookImage"><img src = {logo} alt='logo' className='step6Logo'/></div>
                        <div className="step6BookTitle">{cartLine.book_title}</div>
                        <div className="step6BookPrice">{cartLine.book_price}</div>
                        <div className="step6BookQuantity">{cartLine.quantity}
                        <div className="incrementUp" onClick={this.props.increase}>+</div>
                        <div className="incrementDown" onClick={this.props.decrease}>-</div></div>
                        <div className="step6BookTotal">{subTotal}</div>
                        
           </div>
        })
        return(
            <div>
                {cart}
                <div className="step6BookTotal">{total}</div>
                <StripeCheckout
          token={this.onToken}
          stripeKey={ stripe.pub_key }
          amount={1000}
          name="your order"
          description="literally  begging that you confirm this order"
        />
            </div>
        )
    }
}

