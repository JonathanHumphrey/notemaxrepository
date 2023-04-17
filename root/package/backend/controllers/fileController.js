const File = require("../models/File");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

const multer = require("multer");

const uploadFile = asyncHandler(async (req, res) => {
	const upload = multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, "uploads/");
			},
			filename: (req, file, cb) => {
				cb(null, file.originalname);
			},
		}),
		fileFilter: (req, file, cb) => {
			if (file.mimetype !== "application/pdf") {
				return cb(new Error("Only PDF files are allowed"));
			}
			cb(null, true);
		},
	}).single("file");

	// Calls Multer middleware to handle the file upload
	upload(req, res, (err) => {
		if (err) {
			console.error(err);
			return res.status(400).send({ message: err.message });
		}

		const file = req.file;
		const fileData = req.body;
		const binary = fs.readFileSync(file.path);
		file.path = binary;

		// File storage handling
		const fileForUpload = File.create({
			author: fileData.author,
			username: fileData.username,
			file: file,
			date: fileData.date,
			likes: fileData.likes,
			dislikes: fileData.dislikes,
			category: fileData.category,
			description: fileData.description,
			usersLiked: fileData.usersLiked,
			usersDisliked: fileData.usersDisliked,
		});
		if (fileForUpload) {
			console.log(fileForUpload);
			res.status(201).json({
				_id: fileForUpload._id,
				author: fileForUpload.author,
				username: fileData.username,
				file: fileForUpload.file,
				date: fileForUpload.date,
				likes: fileForUpload.likes,
				dislikes: fileForUpload.dislikes,
				category: fileForUpload.category,
				description: fileForUpload.description,
				usersLiked: fileForUpload.usersLiked,
				usersDisliked: fileForUpload.usersDisliked,
			});
		} else {
			return res.status(400).json({ message: "upload Failed" });
		}
	});
});
const updateLikeCount = asyncHandler(async (req, res) => {
	const file = await File.findById(req.params.id);
	const user = req.params.user;

	if (file) {
		if (!file.usersLiked.includes(user)) {
			file.likes = file.likes + 1;
			file.usersLiked.push(user);
			const updatedFile = await file.save();
			console.log("New likes = " + file.likes);
			res.json(updatedFile);
		} else {
			file.likes = file.likes - 1;
			const filtered = file.usersLiked.filter((id) => id !== user);
			file.usersLiked = filtered;
			const updatedFile = await file.save();
			return res.json(updatedFile);
		}
	} else {
		res.status(404);
		throw new Error("File not found");
	}
});

const updateDislikeCount = asyncHandler(async (req, res) => {
	const file = await File.findById(req.params.id);
	const user = req.params.user;

	if (file) {
		if (!file.usersDisliked.includes(user)) {
			file.dislikes = file.dislikes + 1;
			file.usersDisliked.push(user);
			const updatedFile = await file.save();
			res.json(updatedFile);
		} else {
			file.dislikes = file.dislikes - 1;
			const filtered = file.usersDisliked.filter((id) => id !== user);
			file.usersDisliked = filtered;
			const updatedFile = await file.save();
			return res.json(updatedFile);
		}
	} else {
		res.status(404);
		throw new Error("File not found");
	}
});

// @desc Allows users to delete files
// @params: fileId
const deleteFile = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "File Id Required" });
	}
	const file = await File.findById(id).exec();

	if (!file) {
		return res.status(400).json({ message: "File not found" });
	}

	const result = await file.deleteOne();
	const reply = `File by ${result.author} with ID ${result._id} deleted`;

	res.json(reply);
});

const addComment = asyncHandler(async (req, res) => {
	const file = await File.findById(req.params.id);
	const { author, comment } = req.body;
});
const getAllFiles = asyncHandler(async (req, res) => {
	const files = await File.find().select().lean();

	if (!files?.length) {
		return res.status(400).json({ message: "No Files Found" });
	}
	//res.set("Content-Type", "application/pdf");
	res.send(files);
});
module.exports = {
	uploadFile,
	getAllFiles,
	updateDislikeCount,
	updateLikeCount,
	deleteFile,
};
