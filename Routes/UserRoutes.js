const express = require("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();
router.route("/").get(UserController.AllUserInfo);
router.route("/signup").post(UserController.Signup);
router.route("/login").post(UserController.Login);
router.route("/resetpassword/:token").patch(UserController.resetPassword);
router.route("/forgotpassword").post(UserController.forgotPassword);
router
  .route("/:phoneNumber")
  .get(UserController.SpecificUserInfo)
  .delete(UserController.DeleteUser)
  .patch(UserController.UpdateUser);
module.exports = router;
