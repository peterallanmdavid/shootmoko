var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var photogProfileDetailsSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'Account' },
    name: String,
	type: String,
    level: String,
    shootCount: { type: Number},
    profilePicUrl: String,
    location: String,
    status: String,
    portfolioCount: { type: Number}
});
module.exports = mongoose.model('PhotogProfileDetails', photogProfileDetailsSchema);