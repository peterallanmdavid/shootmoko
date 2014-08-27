var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/register', function(req, res) {
  res.send({msg: 'register get'});
});

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
  	res.send({msg: 'register post'});
});

router.get('/login', function(req, res) {
  res.send({msg: 'login'});
});

module.exports = router;
