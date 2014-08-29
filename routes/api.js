var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var jwt = require('jwt-simple');
var moment = require('moment');
var expires = moment().add('days', 7).valueOf();
var tokenSecret ='taretasrgadrgaerg';


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
    var token = jwt.encode(
    {
    	iss: user.username, 
    	username: user.username,
    	exp: expires
    }, tokenSecret);
    res.json({ 
    	token : token,
    	expires: expires,
    	user: user.toJSON()
    });

  })(req, res, next);  
});


router.get('/listallusers', function(req, res) {
	Account.find(function(err,accounts){
		if(err) res.send(err);
		res.json(accounts);
	});
});

//add token to url or header first
//@todo	move to middleware
router.get('/somerestrictedshit', function(req, res, next){
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	if (token) {
		try {
	    	var decoded = jwt.decode(token, tokenSecret); 
	    	if (decoded.exp <= Date.now()) {
  				res.end('Access token has expired', 400);
			}
			res.json({msg: 'has access'});
	    	// handle token here 
	  	} catch (err) {
	    	return next();
	  	}
	} else {
  		res.json({msg: 'no token'});
	}

});

module.exports = router;
