const router = require('express').Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const User = require('../models/user');

router.route('/signup')
    .get( (req, res, next) => {
        res.render('accounts/signup', {message : req.flash('errors')});
    })
    .post((req, res, next) => {
       User.findOne({email: req.body.email}, function(err, existingUser){
           if(existingUser){
               req.flash('errors', 'Email address already exits try different one!!');
               res.redirect('/signup');
               console.log("In db save body");
           }else{
                var user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.username = req.body.username;
                user.password = req.body.password;
                user.photo = user.gravatar();

                user.save(function(err){
                    // req.logIn(user, function(err){
                        if(err) return next(err);
                        res.redirect('/');
                    // });
                });
           }
       })

    });

router.route('/login')
    .get( (req, res, next) => {
        if(req.user) res.redirect('/');
        res.render('accounts/login', {message: req.flash('loginMessage')});
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

router.get('/logout',(req,res, next) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;