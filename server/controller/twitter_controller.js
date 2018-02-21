let axios = require('axios');


module.exports ={
    getTweets: (req, res, next) => {
        const promise = axios.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${req.user.id}`)
        promise.then( tweets => {
            res.status(200).send(tweets)
        })

    },

    searchTweets: (req, res, next) => {

    }
}