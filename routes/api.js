var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var jwt = require('jwt-simple');
var tokenSecret ="test123test124";
router.get('/register', function(req, res) {
  res.send({msg: 'register get'});
});


//format {"username":"test","password":"test2"}
router.post('/register', function(req, res) {
	Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
        	console.log(err);
            res.send({msg: err});
        }else{
        	console.log("success");
        	res.send({msg: "register success"});
        }
    });
});

//format {"username":"test","password":"test2"}
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: 'login error' });
    }

    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.encode({ username: req.body.username }, tokenSecret);
    res.json({ token : token });

  })(req, res, next);  
});


router.get('/listallusers', function(req, res) {
	Account.find(function(err,accounts){
		if(err) res.send(err);
		res.json(accounts);
	});
});

module.exports = router;
