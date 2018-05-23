const mongoose = require("../connect");
var userSchema = {
  Title : String,
  Year : String,
  imdbID : String,
  Type : Number,
  Poster : String,
  direccionActual : String,
  password : String
};
var user = mongoose.model("user", userSchema);
module.exports = user;
