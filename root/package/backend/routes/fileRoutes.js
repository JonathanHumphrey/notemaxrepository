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
	.get(fileController.getAllFiles)
	.delete(fileController.deleteFile);

router.route("/like/:id/:user").put(updateLikeCount);
router.route("/dislike/:id/:user").put(fileController.updateDislikeCount);

module.exports = router;

/* req.body.categories.forEach((element) => {
	user.categories.push(category);
}); */
