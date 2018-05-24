const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var usuario = mongoose.model('user');
var casaSchema = {
  tipo : String,
  estado : String,
  precio : String,
  ciudad : String,
  region : String,
  ubicacion : String,
  direccion : String,
  descripcion : String,
  cantidadCuartos : String,
  cantidadBaños : String,
  garage : String,
  superficie : String,
  correo : String,
  user: {type: Schema.ObjectId, ref: "usuario"}
};
var inmuebles = mongoose.model("inmuebles", casaSchema);
module.exports = inmuebles;
