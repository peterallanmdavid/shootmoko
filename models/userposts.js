var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userPosts = new Schema({
	userid: String,
    username: String,
    title: String,
	details: String,
	budget: String,
	dateneeded: String,
	dateposted: Date,
	expiration: Date,
	location: String,
	typeofshoot: String,
	enabled: Boolean,
	tags: String,
	posttype: String // photog/client 
});


module.exports = mongoose.model('userPosts', userPosts);