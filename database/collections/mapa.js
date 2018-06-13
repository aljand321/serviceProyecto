const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var mapaSchema = new Schema({
  calle : String,
  descripcion : String,
  precio : Number,
  lat : Number,
  lon : Number,
  vecinos: String,
  ciudad: String,
  galeria: Array,
  contact: String
});
var mapa = mongoose.model("mapa", mapaSchema);
module.exports = mapa;
