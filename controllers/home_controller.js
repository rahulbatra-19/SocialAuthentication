// this is for home page where sign out is given
module.exports.home = function (req, res) {

    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    res.render('home',
        {

            title: "home "
        });
}