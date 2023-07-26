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
// Sign in to create session for the user 
module.exports.createSession = function (req, res) {
    // req.flash('success', 'Logged in successfully:');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    // req.flash('success', 'Logged out successfully!');
    return res.redirect('/users/sign-in');
}

// To reset the password  
module.exports.resetPassword = async function(req, res){
    try {
        let user = await User.findById(req.user._id);
        if(!user){
            console.log("User not found");
        }
        else{
            let oldPassword = req.body.currentPassword;
            if(oldPassword == user.password){
                if(req.body.password == req.body.confirm_password){
                    user.password = req.body.password;
                    console.log('Password changed');
                    user.save();
                }else{
                    console.log("Password don't match");
                }
            }else{

                console.log('Wrong password');
            }
            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error in Resetting Password', error);
        return res.redirect('/');
    }
}