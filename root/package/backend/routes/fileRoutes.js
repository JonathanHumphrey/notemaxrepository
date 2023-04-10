const express = require('express')

const {
    uploadFile,
    getAllFiles
} = require("../controllers/fileController")
const fileController = require("../controllers/fileController");
const router = express.Router()

router
    .route("/")
    .post(fileController.uploadFile)
    .get(fileController.getAllFiles)
    /* .delete(fileController.deleteFile)
    .get(fileController.downloadFile) */

module.exports = router;