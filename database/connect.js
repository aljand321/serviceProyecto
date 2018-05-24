const mongoose = require("mongoose");
//ahi lo cammbie para que de en windows el mongo
mongoose.connect("mongodb://192.168.99.100:27017/apiProyecto");
module.exports = mongoose;
