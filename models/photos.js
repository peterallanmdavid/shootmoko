var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var photos = new Schema({
	userid: String,
	url: String,
    dateposted: String
});

module.exports = mongoose.model('photos', photos);