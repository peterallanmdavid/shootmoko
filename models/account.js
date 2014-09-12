var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Account = new Schema({
    username: String,
    password: String,
	role: String,
	usertype: String,
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photos' }]

});


Account.options.toJSON = {
	    transform: function(doc, ret, options) {
	        ret.id = ret._id;
	        delete ret._id;
	        delete ret.__v;
			delete ret.salt;
			delete ret.hash;
	        return ret;
	    }
};


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);