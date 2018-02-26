import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class Step6 extends Component {
    constructor(){
        super(props)
    }


    onToken = (token) =>{
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(toke),
        }).then(response => {
            response.json().then(data => {
                alert(`we are in business, ${data.email}`);
            })
        })
    }

    render(){
        return(
            <div>
                <StripeCheckout
                token={this.onToken}
                stripeKey="my_PUBLISHABLE_stripekey"
                />
            </div>
        )
    }
}

