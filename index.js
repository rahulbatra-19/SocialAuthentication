const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


const MongoStore = require('connect-mongo');

// user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// used for flash messages
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);


app.use(express.static('./assets'));

// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
    session({
        name: 'SampleApp',
        secret: 'secketKey',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/skilltest2_db',
            autoRemove: 'disabled',
        }),
    })
);
app.use(session({
    name: '',
    // todo hange the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


// using express Routes  
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log('Error in the server', err);
    } else {
        console.log('Yup! My express server is running on the port ', port);
    }
})