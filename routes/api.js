var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var userPosts = require('../models/userposts');
var Photos = require('../models/photos');
var jwt = require('jwt-simple');
var moment = require('moment');
var expires = moment().add('days', 7).valueOf();
var tokenSecret ='taretasrgadrgaerg';
var uploadOptions = {
    tmpDir:  __dirname + '/../public/uploaded/tmp',
    uploadDir: __dirname + '/../public/uploaded/files',
    uploadUrl:  '/uploaded/files/',
    storage : {
        type : 'local'
    }
};
var uploader = require('blueimp-file-upload-expressjs')(uploadOptions);



router.get('/register', function(req, res) {
  res.send({msg: 'register get'});
});


//format {"username":"test","password":"test2", "usertype": "photographer"}
router.post('/register', function(req, res) {
	Account.register(new Account({ 
			username : req.body.username, 
			role: "user",
			usertype: req.body.usertype
		}), req.body.password, function(err, account) {
        if (err) {
        	console.log(err);
            res.send({success: false, msg: err});
        }else{
        	console.log("success");
        	res.send({success: true, msg: "register success"});
        }
    });
});

//format {"username":"test","password":"test2"}
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { success: false, error: 'login error' });
    }

    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.encode(
    {
    	iss: user.username, 
    	username: user.username,
    	id: user.id,
    	exp: expires
    }, tokenSecret);
    res.json({ 
    	success: true,
    	token : token,    	
    	expires: expires,
    	user: user.toJSON()
    });

  })(req, res, next);  
});


router.get('/listallusers', function(req, res) {
	// Account.find(function(err,accounts){
	// 	if(err) res.send(err);
	// 	res.json(accounts);
	// }).populate('photos');

	Account.find().populate('photos').exec(function(err,accounts){
		if(err) res.send(err);
		res.json(accounts);
	});
});

router.get('/listallphotographers', function(req, res) {
	Account.find({usertype: "photographer"},function(err,accounts){
		if(err) res.send(err);
		res.json(accounts);
	});
});

router.get('/listallclients', function(req, res) {
	Account.find({usertype: "client"}, function(err,accounts){
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

//format {"username":"Peter","title":"I am looking for a Wedding Photographer","details":"churva","budget":"3000.00","dateNeeded":"Tue Sep 09 2014 17:54:02 GMT+0800 (China Standard Time)","loc":"Makati City","typeOfShoot":"Wedding"}
router.post('/adduserpost', function(req, res) {
	var currDate = new Date();
	var newUserPosts = new userPosts({
		username: req.body.username,
		title: req.body.title,
		details: req.body.details,
		budget: req.body.budget,
		dateneeded: req.body.dateNeeded,
		dateposted: currDate,
		location: req.body.loc,
		typeofshoot: req.body.typeOfShoot
		});

	newUserPosts.save( function(error, data){
	    if(error){
	        res.json(error);
	    }
	    else{
	        res.send({msg: "New Post Uploaded!!!"});
	    }
	});
});

//get all posts by the userid
router.get('/getuserposts/:userid',function(req, res){
	userPosts.find({userid: req.params.userid}, function(error, data){
	    console.log(data);
	    res.json(data);
	});
});

//get details of a specific post
router.get('/posts/:id',function(req, res){
	userPosts.find({_id: req.params.id}, function(error, data){
	    console.log(data);
	    res.json(data);
	});
});

//add photog photos
router.get('/addphotos',function(req, res){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, tokenSecret);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }

            var photos = new Photos({
                userid : decoded.id,
                url: "/",
                dateposted: ""
            });

            photos.save(function(err,data){
                if(err){
                    res.json(err);
                }
                else{
                    res.send({msg: "Photos saved"});
                }
            });
            // handle token here
        } catch (err) {
            return next();
        }
    }
});




//-- File Upload API --//
//-- You need a valid token to upload to this --//

router.post('/uploadphotos', function(req,res){	
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	if(token){		
		try{
			var decoded = jwt.decode(token, tokenSecret);
			console.log(decoded);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
            if(decoded.id){
            	uploader.post(req, res, function (obj) {
            		var result = [];
        			for(var i=0; i < obj.files.length;i++){
	        			var photos = new Photos({
			                userid : decoded.id,
			                url: obj.files[i].url,
			                dateposted: Date.now()
		            	});

			            photos.save(function(err,data){
			                if(err){			                    
			                    result.push(err);
			                }
			                else{
			                	result.push({msg: obj.files[i].url + " saved"});			                    
			                }
			            });		
        			}            		
        			res.send(obj);
    			});	            
            }else{
            	//probably invalid token
            	res.send({success: false, msg: "an error occurred (invalid token??)"});
            }            
		}catch(e){
			res.send({success: false, msg: "an error occurred (invalid token 2 ???)"});
		}
	}else{
		//missing token
		res.send({success: false, msg: "an error occurred"});	
	}
	
	
});

//console.log(__dirname + '/../public/uploaded/tmp');
module.exports = router;
