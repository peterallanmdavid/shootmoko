var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userPosts = new Schema({
    username: String,
    title: String,
	username: String,
	title: String,
	details: String,
	budget: String,
	dateneeded: String,
	dateposted: Date,
	location: String,
	tpeofshoot: String

});


module.exports = mongoose.model('userPosts', userPosts);