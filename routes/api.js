var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

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

router.get('/login', function(req, res) {
  res.send({msg: 'login'});
});


router.get('/listallusers', function(req, res) {
	Account.find(function(err,accounts){
		if(err) res.send(err);
		res.json(accounts);
	});
});

module.exports = router;
