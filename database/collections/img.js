const mongoose = require("../connect");
var mon = require('mongoose');
 var Schema = mon.Schema;
var imgSchema = {
  name : String,
  idhome: String,
  physicalpath : String,
  relativepath : String
};
var img = mongoose.model("img", imgSchema);
module.exports = img;
