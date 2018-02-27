import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import stripe from '../../stripeKey';

export default class Step6 extends Component {
    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('http://localhost:4321/api/payment', { token, amount: 100 } ).then(response => {
          alert('we are in business')
        });
      }

    render(){
        return(
            <div>
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

