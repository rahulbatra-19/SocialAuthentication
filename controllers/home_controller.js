module.exports.home = function(req, res){
    // console.log(res.locals.user);

    res.render('home',
    {

        title : "home "
    });
}