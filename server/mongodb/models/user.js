const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	phone: { type: String, unique: true ,require:true},
	email: { type: String, unique: true ,default: ""},
	createAt: {
		type: Date,
		default: Date.now,
		
	},
})

module.exports = mongoose.model('user', schema)