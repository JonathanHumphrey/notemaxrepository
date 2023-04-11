const File = require("../models/File");
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFS = Grid(
	"ac-cg3ukqo-shard-00-01.n4odbm8.mongodb.net",
	mongoose.mongo
);
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

	// Call the Multer middleware to handle the file upload
	upload(req, res, (err) => {
		if (err) {
			console.error(err);
			return res.status(400).send({ message: err.message });
		}

		// Here you can access the uploaded file via req.file
		const file = req.file;
		const fileData = req.body;

		// The rest of your code to handle the uploaded file data goes here
		const fileForUpload = File.create({
			author: fileData.author,
			file: file,
			date: fileData.date,
			likes: fileData.likes,
			dislikes: fileData.dislikes,
			category: fileData.category,
		});
		if (fileForUpload) {
			console.log(fileForUpload);
			res.status(201).json({
				author: fileForUpload.author,
				file: fileForUpload.file,
				date: fileForUpload.date,
				likes: fileForUpload.likes,
				dislikes: fileForUpload.dislikes,
				category: fileForUpload.category,
				comments: fileForUpload.comments,
			});
		} else {
			return res.status(400).json({ message: "upload Failed" });
		}
	});
});
const updateLikeCount = asyncHandler(async (req, res) => {
	const file = await File.findById(req.params.id);

	if (file) {
		file.likes = file.likes + 1;
		const updatedFile = await file.save();
		console.log("New likes = " + file.likes + 1);
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
	res.json(files);
});
module.exports = {
	uploadFile,
	getAllFiles,
	updateDislikeCount,
	updateLikeCount,
};
