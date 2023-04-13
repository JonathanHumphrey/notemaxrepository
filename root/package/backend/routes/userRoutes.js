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

router.route("/categories").put(userController.addLikedCategory);
router.route("/categories").delete(userController.removeLikedCategory);
router.route("/categories").get(userController.getUsersLikedCategories);
module.exports = router;
