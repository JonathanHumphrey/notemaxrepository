const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	file: {
		type: Object,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
		required: true,
	},
	dislikes: {
		type: Number,
		default: 0,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
