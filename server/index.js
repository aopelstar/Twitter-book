//requirements

const express = require('express');
const bodyparser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
require('dotenv').config();

//app set up

const checkforSession = require('./middleware/checkForSession');
const app = express();

app.use( bodyparser.json());
app.use( cors() );

// sessions

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use( checkforSession );

//authentication

 app.use(passport.initialize() );
 app.use(passport.session() );

 massive( process.env.CONNECTION_STRING).then( db => {
     app.set('db', db);
 })



//endpoints



//port

const port = process.env.SERVER_PORT || 4321
app.listen( port, () => console.log(`Lots of heavy petting on port ${port}`))