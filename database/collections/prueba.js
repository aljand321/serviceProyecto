const mongoose = require("../connect");
var pruebaSchema = {
  Title : String,
  Year : String,
  imdbID : String,
  Type : String,
  Poster : String
};
var prueba = mongoose.model("prueba", pruebaSchema);
module.exports = prueba;
