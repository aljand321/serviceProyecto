const mongoose = require("../connect");
var usuario = mongoose.model('user');
const Schema = require("mongoose").Schema;
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
  gallery: Array,
  user: {type: Schema.ObjectId, ref: "user"}
};
var inmuebles = mongoose.model("inmuebles", casaSchema);
module.exports = inmuebles;
