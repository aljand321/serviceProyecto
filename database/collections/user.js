const mongoose = require("../connect");
var userSchema = {
  nombre : String,
  apellido : String,
  email : String,
  numeroTelefono : Number,
  ciudad : String,
  direccionActual : String,
  password : String
};
var user = mongoose.model("user", userSchema);
module.exports = user;
