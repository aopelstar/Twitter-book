let axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



module.exports ={
   payment: (req, res, next) =>{
       const amountArray = req.body.amount.toString().split('')
       const pennies = [];
       const { amount } = req.body
       const db = req.app.get('db');
       for(i=0; i<amountArray.length; i++){
           if(amountArray[i] === "."){
               if(typeof amountArray[i+1]==="string"){
                   pennies.push(amountArray[i+1])
               } else {
                   pennies.push("0");
               }
               if(typeof amountArray[i+2]==="string"){
                pennies.push(amountArray[i+2])
             } else {
                pennies.push("0");
            } break;

           }else {
               pennies.push(amountArray[i])
           }
       }
       const convertedAmt = parseInt(pennies.join(''))
       const charge = stripe.charges.create({
           amount:convertedAmt,
           currency: "usd",
           source: req.body.token.id,
           description: "test charge from react app"
       }, function(error, charge){
            if(error){
                return res.sendStatus(500)
            } 
            return res.sendStatus(200)
       })
   }
}