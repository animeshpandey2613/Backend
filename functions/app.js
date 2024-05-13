const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception, Shutting down the server");
  process.exit(1);
});
const app = require("../app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.PASSWORD
).replace("<USER>", process.env.USER);
mongoose.connect(DB).then(() => console.log("Database Connected"));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection, Shutting down the server");
    process.exit(1);
});

module.exports.handler = app;