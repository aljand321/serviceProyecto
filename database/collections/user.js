const mongoose = require("../connect");
var userSchema = {
  nombre : String,
  apellido : String,
  edad : Number,
  email : String,
  numeroTelefono : Number
};
var user = mongoose.model("user", userSchema);
module.exports = user;
