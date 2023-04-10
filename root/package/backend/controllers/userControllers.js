const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, categories } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(404);
		throw new Error("User already exists");
	}

	console.log("creating user ", req.body.name);
	const user = await User.create({
		name,
		email,
		password,
		categories,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			categories: user.categories,
		});
	} else {
		res.status(400);
		throw new Error("Invalid Email/Password");
	}
});

const getAllUsers = asyncHandler(async (req, res) => {
	// Get all users from MongoDB
	const users = await User.find().select("-password").lean();

	// If no users
	if (!users?.length) {
		return res.status(400).json({ message: "No users found" });
	}

	res.json(users);
});

// @desc Delete a User
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "User Id Required" });
	}
	const user = await User.findById(id).exec();

	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}

	const result = await user.deleteOne();
	const reply = `Username ${result.username} with ID ${result._id} deleted`;

	res.json(reply);
});
module.exports = { registerUser, authUser, getAllUsers, deleteUser };
