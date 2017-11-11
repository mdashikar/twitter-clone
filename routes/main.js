const router = require('express').Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');

router.get('/', (req, res, next) => {
    if(req.user){
        Tweet.find({})
            .sort('-createdAt')
            .populate('owner')
            .exec(function(err, tweets){
                if(err) return next(err);
                res.render('main/tweet', {title: 'Twitter - Home', tweets: tweets});
            })

        
    }else{
        res.render('main/home', {title: 'Twitter - Home'});
    }
    
});

router.get('/create-new-user', (req, res, next) => {
    var user = new User();

    user.email = "mdashikar2@gmail.com";
    user.name = "Ashik";
    user.password = "Hello!";
    user.username = "mdashikar";
    user.save( function(err){
        if(err) return next(err);
        res.send("Successfully Created!!");
    })

});

module.exports = router;