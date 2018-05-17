const mongoose = require("../connect");
var casaSchema = {
  tipo : String,
  estado : String,
  ciudad : String,
  zona : String,
  direccion : String,
  precio : String,
  descripcion : String

};
var casa = mongoose.model("casa", casaSchema);
module.exports = casa;
