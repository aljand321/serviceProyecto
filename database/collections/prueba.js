const mongoose = require("../connect");
var pruebaSchema = {
  nombre : String,
  apellido : String
};
var prueba = mongoose.model("prueba", pruebaSchema);
module.exports = prueba;
