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
var inmuebles = mongoose.model("inmuebles", casaSchema);
module.exports = inmuebles;
