const movieModel = require("../Models/MovieModel");
const AppError = require("../Utils/AppError");
const APIFeatures = require("../Utils/APIFeatures");
const catchAsyncError = require("../Utils/CatchAsyncError");
const UserModel = require("../Models/UserModel");
exports.InsertMovie = catchAsyncError(async (req, res, next) => {
  const data = await movieModel.create(req.body);
  res.send({
    status: "success",
    data,
  });
});
exports.GetSpecificMovie = catchAsyncError(async (req, res, next) => {
  const data = movieModel.findById(req.params.id);
  if (!data) return new AppError("Movie Does not exist", 400);
  res.send({
    status: "success",
    data,
  });
});
exports.GetAllMovies = catchAsyncError(async (req, res, next) => {
  const Features = new APIFeatures(req.query, movieModel);
  Features.filter().sort().fieldLimiting().pagination();
  const data = await Features.MongooseQuery;
  if (!data) return new AppError("Movie Does not exist", 400);
  res.send({
    status: "success",
    data,
  });
});
exports.GetUserWatchedMovies = catchAsyncError(async (req, res, next) => {
  const phoneNumber = req.params.phoneNumber;
  const data = await UserModel.findOne({ phoneNumber }).select("movieWatched");
  const MovieInfo = await Promise.all(
    data.movieWatched.map(async (e) => {
      return await movieModel.findById(e.movieId);
    })
  );

  res.send({
    status: "success",
    data: MovieInfo,
  });
});

exports.InsertPotraitImage = catchAsyncError(async(req, res, next)=>{
  const data = await movieModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
  res.send({
    status:"sucess",
    data,
  })
})