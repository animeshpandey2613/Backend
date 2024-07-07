const express = require("express");
const userController  = require("../Controllers/UserController");
const MovieController = require("../Controllers/MovieController");
const router = express.Router();
router
  .route("/")
  .post(MovieController.InsertMovie)
  .get(userController.Protect, MovieController.GetAllMovies);
router.route("/:id").get(MovieController.GetSpecificMovie).post(InsertPotraitImage);
router.route("/watched/:phoneNumber").get(MovieController.GetUserWatchedMovies);
module.exports = router;