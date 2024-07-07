const Mongoose = require("mongoose");
const movieSchema = new Mongoose.Schema({
  name: {
    required: [true, "Movie Name is required"],
    unique: [true, "Movie with this name already exists"],
    type: String,
  },
  catagory: {
    type: [String],
    require: [true, "Catagory is required"],
  },
  landscapeImage: {
    required: [true, "Landscape Image is required"],
    unique: [true, "This image is already used in a Movie"],
    type: String,
  },
  titleImage: {
    required: [true, "Title image is required"],
    unique: [true, "This image is already used in a Movie"],
    type: String,
  },
  potraitImage:{
    type:String,
    required:[true, "Potrait Image is required"],
  },
  trailer: {
    type: String,
  },
  year: {
    required: [true, "Year is required"],
    type: Number,
  },
  duration: {
    required: [true, "Duration is required"],
    type: String,
  },
  restricions: {
    type: String,
    required: [true, "Restriction is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  newlyAdded: {
    type: Boolean,
    required: [true, "newlyAdded is required"],
  },
  languages: {
    type: [String],
    required: [true, "LanguageInfo is required"],
  },
  tags: {
    type: [String],
    required: true,
  },
  whishlist: {
    type: Boolean,
    default: false,
  },
});

const movieModel = Mongoose.model("Movies", movieSchema);
module.exports = movieModel;
