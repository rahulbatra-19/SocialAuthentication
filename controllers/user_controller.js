const User = require('../models/user');

// Sign In data
module.exports.signIn = function(req, res){
    res.render('user_signIn',{
        title : "Sign In"
    });
}
// Sign Up data
module.exports.signUp = function(req, res){
    res.render('user_signUp',{
        title : "Sign Up"
    });
}


// getting Sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            User.create({email :req.body.email,
            password : req.body.password ,
            name : req.body.name
        }).then(user => {
                return res.redirect('/users/sign-in');
            }).catch(err => {
                console.log('Error in creating user in signing-up', err);
            });
        } else {
            return res.redirect('back');
        }

    }).catch(err => {
        console.log('Error in finding user in signing-up!!', err);
    });
}