const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
// const passport = require('passport');

// router.get('/sign-up', userController.signUp);
// router.get('/sign-in', userController.signIn);
// router.post('/create', userController.create);
// router.get('/sign-out', userController.destroySession);

// // use passport as a middleware to authenticate
// router.post('/create-session', passport.authenticate(
//     'local',
//     {
//         failureRedirect: '/users/sign-in'
//     },
// ),  userController.createSession );

module.exports = router;