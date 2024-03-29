const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	username: {
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
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	usersLiked: {
		type: Array,
		required: true,
	},
	usersDisliked: {
		type: Array,
		required: true,
	},
});
const File = mongoose.model("File", fileSchema);
module.exports = File;
