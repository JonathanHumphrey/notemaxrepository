const mongoose = require("mongoose");

// Provides a model for the user object and what should be included - JH

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	categories: [
		{
			type: String,
			required: true,
		},
	],
});

module.exports = mongoose.model("User", userSchema);
