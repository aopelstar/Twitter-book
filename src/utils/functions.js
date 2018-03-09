


module.exports = {
    changeText: () => {
        var text = 'RT @KentMurphy: RT if you miss the Kid 🐐 https://t.co/PNopACMiVc'
        var text1 = text.replace(/https.*$/g, '')
        var text2 = text1.replace(/^(.*?)\: /g, '')
        return text2
    },

    userExist: () => {
        var user = "Juan Castro"
        if (user == false) {
            return "false"
        } else {
            return user
        }
    },

    isAnArray: () => {
        var params = ['book', true, 'dog', 'elephantitis', 700, 'Jeft Goldbloom']
        return params
    },

    imageSize: () => {
        image = 'profilepic+normal'
        return image.replace('normal', '400x400')
    },
    answer: () => {
        var stateTweets = [{ name: "Dan", age: 28 }, { name: "James", age: 30 }, { name: "Mason", age: 40 }, { name: "Trent", age: 7 }, { name: "Andrew", age: 29 }, { name: 'Justin', age: 20 }]
        var selectedTweets = [{ name: "Dan", age: 28 }, { name: "Mason", age: 40 }, { name: 'Justin', age: 20 }]
        let tweet2 = stateTweets.map((e, i) => {
            let tweet = selectedTweets.map((x, y) => {
                if (x.name === e.name) {
                    return true
                }
                return false
            })
            return tweet
        })
        return tweet2
    },

    currencyConversion: (amount) => {
        const amountArray = amount.toString().split('');
        const pennies = [];
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
        return convertedAmt
    },

    changeQty: (user, bookId, diff) => {
        var cart = [{ user_id: 1, book_id: 2, quantity: 3 }, { user_id: 1, book_id: 3, quantity: 2 }, { user_id: 2, book_id: 2, quantity: 3 }];

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].user_id === user && cart[i].book_id === bookId) {
                cart[i].quantity += Number(diff)
            }
        }

        return cart
    }
}