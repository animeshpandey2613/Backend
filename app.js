//export statements
const express = require("express");
const morgan = require("morgan");
const UserRouter = require("./Routes/UserRoutes");
const ErrorController = require("./Controllers/ErrorController");
const AppError = require("./Utils/AppError");
const MovieRouter = require("./Routes/MovieRouter");
const cors = require("cors");

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", UserRouter);
app.use("/movies", MovieRouter);
app.use('/users', UserRouter);
app.use('/movies', MovieRouter); 

app.all("*", (req, res, next) => next(new AppError("Invalid Route", 404)));
app.use(ErrorController);

module.exports = app;
