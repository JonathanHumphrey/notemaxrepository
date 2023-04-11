const File = require("../models/File");
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFS = Grid(
  "ac-cg3ukqo-shard-00-01.n4odbm8.mongodb.net",
  mongoose.mongo
);
const asyncHandler = require("express-async-handler");
// Add necessary middleware for handling file uploads
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// This can only accept string data as of now, I haven't been able to connect it to the actual file for storage

const uploadFile = asyncHandler(async (req, res) => {
  const { author, file, date, likes, dislikes, category, comments } = req.body;

  const pdfData = Buffer.from(file, "base64");
  const gridFSBucket = new mongodb.openUploadStream(file);
  const writeStream = uploadStream.write(file);
  writeStream.on("finish", () => {});

  const fileForUpload = await File.create({
    author,
    file,
    date,
    likes,
    dislikes,
    category,
    comments,
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
    throw new Error("File unable to upload");
    return res.status(400).json({ message: "upload Failed" });
  }
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
