var express = require('express');
var router = express.Router();
var _ = require("underscore");

var House = require("../../../database/collections/house");
//añadiendo una casa
router.post("/house", (req, res) => {
//los datos de la casa
  var house = {
    descrp : req.body.descrp,
    tipo : req.body.tipo,
    estado : req.body.estado,
    tam : req.body.tam,
    //esta parte tendria que estar enlazado con el mapa vecindario
    banio : req.body.banio,
    cuarto : req.body.cuarto,
    precio : req.body.precio
  };
  var houseDAT = new House(house);
  houseDAT.save().then( () => {
    res.status(200).json({
      "msn" : "Casa registrada"
    });
  });
});

module.exports = router;
