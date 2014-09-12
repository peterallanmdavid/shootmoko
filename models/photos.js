var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var photos = new Schema({
	userid: {type: Schema.Types.ObjectId, ref: 'Account' },
	url: String,
    dateposted: String
});

module.exports = mongoose.model('Photos', photos);