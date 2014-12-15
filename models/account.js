var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var accountSchema = new Schema({
    username: String,
    password: String,
	role: String,
	usertype: String,
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photos' }]

});


accountSchema.options.toJSON = {
	    transform: function(doc, ret, options) {
	        ret.id = ret._id;
	        delete ret._id;
	        delete ret.__v;
			delete ret.salt;
			delete ret.hash;
	        return ret;
	    }
};


accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);