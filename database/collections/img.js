const mongoose = require("../connect");
var mon = require('mongoose');
var Shema = mon.Shema;
var imgSchema = new Shema {
  name : String,
  idhome: String,
  physicalpath : String,
  relativepath : String
};
var img = mongoose.model("img", imgSchema);
module.exports = img;
