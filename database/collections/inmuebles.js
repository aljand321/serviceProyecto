const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var casaSchema = {
  tipo : String,
  estado : String,
  precio : String,
  ciudad : String,
  region : String,
  descripcion : String,
  cantidadCuartos : String,
  cantidadBaños : String,
  garage : String,
  superficie : String,
  lat : Number,
  lon : Number,
  gallery: Array,
  imagen : Array,
  picture : String,
  correo : String,
  user: {type: Schema.ObjectId, ref: "user"}
};
var inmuebles = mongoose.model("inmuebles", casaSchema);
module.exports = inmuebles;
