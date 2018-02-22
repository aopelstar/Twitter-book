//requirements

require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
const controller = require('./controller/twitter_controller');
const axios = require('axios');


//app set up

const checkforSession = require('./middleware/checkForSession');
const app = express();

app.use(bodyparser.json());
app.use(cors());

// sessions

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use( checkforSession );

//authentication

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {

    let { displayName, user_id, picture } = profile
    const db = app.get('db')
    console.log(accessToken, profile)

    db.find_user([user_id]).then(function (users) {
        if (!users[0]) {
            db.create_user(
                [user_id, displayName, picture]
            ).then(user => {
                return done(null, { token: accessToken, id: user[0].auth_id })
            })
        } else if (users[0]) {
            db.update_user([user_id, displayName, picture])
                .then(user => {
                    return done(null, { token: accessToken, id: user[0].auth_id })
                })
        } else {
            return done(null, users[0].auth_id)
        }
    })


}))

passport.serializeUser((user, done) => {
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    app.get('db').find_user([user.id])
        .then(function (foundUser) {
            return done(null, Object.assign(foundUser[0], { token: user.token }))
        })
})


app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/home',
    failureRedirect: '/'
}));

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('User not found');
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/auth/logout', function (req, res) {
    req.logOut();
    res.redirect(process.env.LOGOUT_REDIRECT)
})


//endpoints
//get tweets
app.get('/api/twitter', (req, res) => {

    // Import Twitter npm package
    var Twit = require('twit');

    // Twitter API Credentials
    var T = new Twit({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    // Get twitter handle from API user request
    // var handle = apitite.param('handle');
    let tid = req.user.auth_id.replace("twitter|", "");
    console.log(tid)

    // Make call to Twitter API to get user's timeline
    T.get('statuses/user_timeline', { user_id: tid, count:30 },  function (err, data, response) {
      }).then(resp => {
        res.status(200).send(resp)
    })
})


app.post('/api/searchedUser', (req, res) => {
    T.get('users/lookup', { screen_name: req.body.screenName, count: 10 }, function (err, data, response) {
    }).then(resp => {
        var id = resp.data[0].id_str
        T.get('statuses/user_timeline', { user_id: id, count: 30 }, function (err, data, response) {
        }).then(respo => {
            res.status(200).send(respo)
        })
    })
})

// app.post('/api/slug', (req, res) => {
//     T.get('users/suggestions/:slug', { slug: req.body.screenName, count: 10 }, function (err, data, response) {
//     }).then(resp => {
//         res.status(200).send(resp)
//     })
// })
//get books
app.get('/api/get-featured-books', (req, res) => {
    const db = app.get('db');
    db.books_test().then(resp => {
        res.status(200).send(resp)
    })
})



//port

const port = process.env.SERVER_PORT || 4321
app.listen(port, () => console.log(`Lots of heavy petting on port ${port}`))