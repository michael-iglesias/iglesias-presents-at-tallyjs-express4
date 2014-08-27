var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BirdSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Bird', BirdSchema);