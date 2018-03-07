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

    tweetsCategory: (req, res) => {
        var { cat } = req.params
         T.get('users/suggestions/:slug', {slug: cat}, function (err, data, response) {
        }).then(category => { res.status(200).send(category) })
    },

    getFeaturedBooks: (req, res) => {
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
        let { user_id, book_id, size, title, subtitle, book_text_color, color, backText, pages_format, featured, book_price, draft, booktweets } = req.body
        if (book_id === 0) {
            db.create_book([size, book_price, draft, req.user.auth_id, featured]).then(resp => {
                res.status(200).send(resp)
            })
        } else {
            db.update_book([book_id, title, subtitle, req.user.auth_id, size, color, backText, pages_format, featured, book_price, draft, book_text_color]).then(resp => {
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

        db.get_booktweets([user]).then(resp => {
            res.status(200).send(resp)
        })
    },

    bookTweets: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;
        let book = req.params.bookId

        db.get_booktweetsbybook([user, book]).then(tweets => {
            res.status(200).send(tweets)
        })
    },

    removeTweet: (req,res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;
        let tweet = req.params.tweetId;

        db.remove_tweet([user, tweet]).then(deleted => {
        })
        db.get_booktweets([user]).then(tweets => {
            res.status(200).send(tweets)
        })
    },

    removeFromCart: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;
        let book_id = req.params.bookId;

        db.removeFromCart([user, book_id]).then(resp => {
            db.get_cart([user]).then(updatedCart => {
                res.status(200).send(updatedCart);
            })
        })
    },

    changeQuantity: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;
        const { bookId, diff } = req.params;
        var change

        db.get_cart([user]).then(cart => {
            for (let i = 0; i < cart.length; i++) {

                if (cart[i].user_id == user && cart[i].book_id == bookId) {
                    change = Number(cart[i].quantity) + Number(diff)

                }
            }
            if (change <= 0) {
                db.removeFromCart([user, bookId]).then(newCart => {
                    db.get_cart([user]).then(cart => {
                        res.status(200).send(cart)
                    })
                })
            } else {
                db.changeQuantity([user, bookId, +change]).then(newCart => {
                    db.get_cart([user]).then(cart => {
                        res.status(200).send(cart)
                    })

                })
            }
        })

    },

    getOrderHistory: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;

        db.get_orderHistory([user]).then(orders => {
            var results = [];
            for (var i = 0, obj = {}; i < orders.length; i++) {
                var { order_id
                    , order_date
                    , order_total
                    , line_id
                    , book_id
                    , book_price
                    , quantity
                    , book_title
                    , book_subtitle
                    , book_size
                    , book_color
                    , pages_format
                    , featured
                    , back_text
                } = orders[i];

                if (order_id != obj.orderNumber) {
                    obj = {
                        orderNumber: order_id,
                        orderDate: order_date,
                        orderTotal: order_total,
                        orderLines: []
                    }
                    results.push(obj);
                }

                obj.orderLines.push({
                    orderLine: line_id,
                    bookId: book_id,
                    bookPrice: book_price,
                    quantity: quantity,
                    bookTitle: book_title,
                    bookSubTitle: book_subtitle,
                    bookSize: book_size,
                    bookColor: book_color,
                    pagesFormat: pages_format,
                    backText: back_text
                })
            }

            res.status(200).send(results)
        })
    },

    getDrafts: (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;

        db.get_drafts([user]).then(drafts => {
            res.status(200).send(drafts)
        })
    },

    deleteDraft: async (req, res) => {
        const db = req.app.get('db');
        let user = req.user.auth_id;
        let id = req.params.id;

       await db.delete_draft([id]).then(drafts => {})
       await db.delete_drafttweets([id]).then(newDrafts => {})
       await db.get_drafts([user]).then(update => {
            res.status(200).send(update)
        })
    },
    deleteTweetFromBook: async (req,res) => {
        const db = req.app.get('db');
        let id = req.params.id;
        let user = req.user.auth_id;

        await db.delete_tweet_from_book([id]).then( deleted => {})
        await db.get_booktweets([user]).then( resp => {
            res.status(200).send(resp)
        })
    }


}