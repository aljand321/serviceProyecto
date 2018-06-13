const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var casaSchema = {
  tipo : String,
  estado : String,
  precio : String,
  ciudad : String,
  region : String,
  ubicacion : String,
  descripcion : String,
  cantidadCuartos : String,
  cantidadBaños : String,
  garage : String,
  superficie : String,
  gallery: Array,
  correo : String,
  user: {type: Schema.ObjectId, ref: "user"}
};
var inmuebles = mongoose.model("inmuebles", casaSchema);
module.exports = inmuebles;
