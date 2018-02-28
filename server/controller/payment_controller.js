const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
    payment: (req, res, next) => {
        //convert amount to pennies

        const amountArray = req.body.amount.toString().split('');
        const pennies = [];
        const { address, city, state, zipCode, amount, email, phone, cart } = req.body;
        const user = cart[0].user_id;
        const date = new Date();
        const db = req.app.get('db');
        for (var i = 0; i < amountArray.length; i++) {
            if (amountArray[i] === ".") {
                if (typeof amountArray[i + 1] === "string") {
                    pennies.push(amountArray[i + 1]);
                } else {
                    pennies.push("0");
                }
                if (typeof amountArray[i + 2] === "string") {
                    pennies.push(amountArray[i + 2]);
                } else {
                    pennies.push("0");
                }
                break;
            } else {
                pennies.push(amountArray[i])
            }
        }
        const convertedAmt = parseInt(pennies.join(''));
    
        const charge = stripe.charges.create({
            amount: convertedAmt, // amount in cents, again
            currency: 'usd',
            source: req.body.token.id,
            description: 'Test charge from react app'
        }, function (err, charge) {
            if (err) return res.sendStatus(500, "back up offa me")
            db.create_order([user, date, address, city, state, zipCode, amount, email, phone]).then(order=>{
                let orderId = order[0].order_id
                for(var i = 0;i<cart.length;i++){
                    let bookId = cart[i].book_id;
                    let qty = cart[i].quantity;
                    db.create_orderline([orderId, bookId, qty]).then(line=>{})
                }
                db.clear_cart([user]).then(emptyCart=>{
                    var cart = []
                    db.get_cart([user]).then(resp=>{
                        cart.push(resp)
                    })
                })
            })
        });
    }
}