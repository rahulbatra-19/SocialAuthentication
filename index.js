const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');





// set up view engine
app.set('view engine' , 'ejs');
app.set('views', './views');

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