module.exports.home = function (req, res) {
    // console.log(res.locals.user);
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    res.render('home',
        {

            title: "home "
        });
}