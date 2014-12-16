var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var photogDetailsSchema = new Schema({
	userid: {type: Schema.Types.ObjectId, ref: 'Account' },
	type: String,
    level: String,
    shootCount: int,
    profilePicUrl: String,
    location: String,
    status: String,
    portfolioCount: int,
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photos' }]
});
module.exports = mongoose.model('PhotogDetails', photogDetailsSchema);