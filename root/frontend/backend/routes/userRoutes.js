const express = require("express");
const {
	registerUser,
	authUser,
	deleteUser,
} = require("../controllers/userControllers");
const userController = require("../controllers/userControllers");
const router = express.Router();

router
	.route("/")
	.post(userController.registerUser)
	.delete(userController.deleteUser)
	.get(userController.getAllUsers);
router.route("/login").post(authUser);

module.exports = router;
