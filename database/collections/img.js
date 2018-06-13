<<<<<<< HEAD
onst mongoose = require("../connect");
var imgSchema = {
  name : String,
=======
const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var imgSchema = {
  name : String,
  idhome: String,
>>>>>>> aa6ddf82e2b4b9b510e9667a0f8ef3cf3533c008
  physicalpath : String,
  relativepath : String
};
var img = mongoose.model("img", imgSchema);
module.exports = img;
