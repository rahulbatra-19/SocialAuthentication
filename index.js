const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


// user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


const expressLayouts = require('express-ejs-layouts');
 app.use(expressLayouts);


 app.use(express.static('./assets'));

 // extract style and scripts from sub pages into the layout 
 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// set up view engine
app.set('view engine' , 'ejs');
app.set('views', './views');


app.use(session({
    name: 'SampleApp',
    // todo hange the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// using express Routes  
app.use('/', require('./routes'));

app.listen(port , function(err){
    if(err)
    {
        console.log('Error in the server', err);
    }else{
        console.log('Yup! My express server is running on the port ', port);
    }
})