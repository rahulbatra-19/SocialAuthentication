// require the library
const mongoose = require('mongoose');

//  Error handling 
main().catch(err => console.log('Error connecting to db', err));


// connect to data base 
async function main(){
    await mongoose.connect('mongodb://localhost/skilltest2_db');
}

// acquire the connection to check if it is successfull 

const db = mongoose.connection;

db.once('open' , function()
{
    console.log('Successfully connected to the database:: MongoDB');
});

module.exports = db;
