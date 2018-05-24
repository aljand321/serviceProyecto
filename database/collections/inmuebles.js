const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var usuario = mongoose.model('user');
var casaSchema = {
  tipo : String,
  estado : String,
  ciudad : String,
  zona : String,
  direccion : String,
  precio : String,
  descripcion : String,
  id_user: { type: Schema.ObjectId, ref: "usuario" },
  correo : String

};
var inmuebles = mongoose.model("inmuebles", casaSchema);
module.exports = inmuebles;
