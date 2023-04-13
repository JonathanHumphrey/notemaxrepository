const File = require("../models/File");
const fs = require("fs");
const mongoose = require("mongoose");
/* const Grid = require("gridfs-stream");
const GridFS = Grid(
	"ac-cg3ukqo-shard-00-01.n4odbm8.mongodb.net",
	mongoose.mongo
); */
const asyncHandler = require("express-async-handler");

const multer = require("multer");

// This can only accept string data as of now, I haven't been able to connect it to the actual file for storage

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
		console.log(file);

		// File storage handling
		const fileForUpload = File.create({
			author: fileData.author,
			username: fileData.username,
			file: file,
			date: fileData.date,
			likes: fileData.likes,
			dislikes: fileData.dislikes,
			category: fileData.category,
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
			});
		} else {
			return res.status(400).json({ message: "upload Failed" });
		}
	});
});
const updateLikeCount = asyncHandler(async (req, res) => {
	console.log("here");
	const file = await File.findById(req.body.id);

	if (file) {
		file.likes = req.body.likes;
		const updatedFile = await file.save();
		console.log("New likes = " + req.params.likes);
		res.json(updatedFile);
	} else {
		res.status(404);
		throw new Error("File not found");
	}
});

const updateDislikeCount = asyncHandler(async (req, res) => {
	const file = await File.findById(req.params.id);

	if (file) {
		file.dislikes = file.dislikes + 1;
		const updatedFile = await file.save();
		console.log("New dislikes = " + file.dislikes + 1);
		res.json(updatedFile);
	} else {
		res.status(404);
		throw new Error("File not found");
	}
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
	res.set("Content-Type", "application/pdf");
	res.send(files);
});
module.exports = {
	uploadFile,
	getAllFiles,
	updateDislikeCount,
	updateLikeCount,
};
