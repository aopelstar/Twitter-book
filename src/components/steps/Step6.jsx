import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import stripe from '../../stripeKey';

export default class Step6 extends Component {
    constructor(){
        super()
    }


    onToken = (token) =>{
        token.card= void 0;
        axios.post('/api/payment', {
            token,
            amount: 10

        }).then(response =>{
            alert("We are in business")
        })
    }

    render(){
        return(
            <div>
                <StripeCheckout
                token= {this.onToken}
                stripeKey= {stripe.pub_key} 
                name="your order"
                description="Please buy stuff"
                amount={1000}
                />
            </div>
        )
    }
}

