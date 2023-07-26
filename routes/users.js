const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
router.get('/sign-out', userController.destroySession);
router.post('/resetPassword', userController.resetPassword);

router.get('/forgot-pass',     userController.forgotPass);
router.post('/passwordForgot', userController.passwordForgot);
router.get('/passwordChange',  userController.passChange);
router.post('/reset-password', userController.resetPass);

// Authentication using google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), userController.createSession);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in'
    },
), userController.createSession);

module.exports = router;
