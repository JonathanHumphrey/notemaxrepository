const express = require("express");
const {
	uploadFile,
	getAllFiles,
	updateLikeCount,
} = require("../controllers/fileController");
const fileController = require("../controllers/fileController");
const router = express.Router();

router
	.route("/")
	.post(fileController.uploadFile)
	.get(fileController.getAllFiles);
/* .delete(fileController.deleteFile)
    .get(fileController.downloadFile) */

router.route("/like/:id").put(fileController.updateLikeCount);
router.route("/dislike/:id").put(fileController.updateDislikeCount);

module.exports = router;
