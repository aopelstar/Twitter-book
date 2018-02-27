const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


module.exports = {
    addToCart: (req, res, next) => {
        const { book_id, quantity, book_price, user_id } = req.body
        const db = req.app.get('db');

        db.addToCart([book_id, quantity, book_price, user_id]).then(cart => {
            res.status(200).send(cart)
        })
    },

    getTweets: (req, res) => {
        // Get twitter handle from API user request
        let tid = req.user.auth_id.replace("twitter|", "");


        // Make call to Twitter API to get user's timeline
        T.get('statuses/user_timeline', { user_id: tid, count: 30 }, function (err, data, response) {
        }).then(resp => {
            res.status(200).send(resp)
        })
    },

    searchTweets: (req, res) => {
        T.get('users/lookup', { screen_name: req.body.screenName, count: 10 }, function (err, data, response) {
        }).then(resp => {
            var id = resp.data[0].id_str
            T.get('statuses/user_timeline', { user_id: id, count: 30 }, function (err, data, response) {
            }).then(respo => {
                res.status(200).send(respo)
            })
        })
    },

    getBooks: (req, res) => {
        const db = req.app.get('db');
        db.books_test().then(resp => {
            res.status(200).send(resp)
        })
    },

    updateTweets: (req, res) => {
        const { img, userName, userScreenName, text, mediaOne, mediaTwo, mediaThree, mediaFour, tweet_date } = req.body
        const user = req.user.auth_id;
        const db = req.app.get('db')
        db.add_tweets([img, userName, userScreenName, text, mediaOne, mediaTwo, mediaThree, mediaFour, user, tweet_date]).then(resp => {
            res.status(200).send(resp)
        })
    },

    updateBooks: (req, res) => {
        const db = req.app.get('db');
        let { user_id, book_id, size, title, subtitle, color, backText, pages_format, featured, book_price, draft, booktweets } = req.body
        if (book_id === 0) {
            db.create_book([size, book_price, draft, req.user.auth_id]).then(resp => {
                res.status(200).send(resp)
            })
        } else {
            db.update_book([book_id, title, subtitle, req.user.auth_id, size, color, backText, pages_format, featured, book_price, draft]).then(resp => {
                res.status(200).send(resp)
            })
            for (let i = 0; i < booktweets.length; i++) {
                db.update_tweets([book_id, booktweets[i].tweet_id]).then(resp => {
                    res.status(200).send(resp)
                })
            }
        }
    },

    getCart: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;

        db.get_cart([user]).then(resp => {
            res.status(200).send(resp)
        })
    },

    selectedTweets: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;
<<<<<<< HEAD
        console.log(user)
        db.get_booktweets([user]).then(resp=>{
=======

        db.get_booktweets([user]).then(resp => {
>>>>>>> master
            res.status(200).send(resp)
        })
    }


}