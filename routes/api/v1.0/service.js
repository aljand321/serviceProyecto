var express = require('express');
var router = express.Router();
var _ = require("underscore");

var User = require("../../../database/collections/user");

//añadiendo a usario

router.post("/user", (req, res) => {

 //validando usarios

  var user = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    edad : req.body.edad,
    email : req.body.email,
    numeroTelefono : req.body.numeroTelefono
  };
  var userData = new User(user);

  userData.save().then( () => {
      res.status(200).json({
        "msn" : "Registrado con exito"
      });
  });

});

//mostrar usuarios

router.get("/user", (req, res, next) =>{
  User.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
});

//leer solo un usario por id

router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
   var url = req.url;
   var id = url.split("/")[2];
   User.findOne({_id : id}).exec( (error, docs) => {
     if (docs != null) {
         res.status(200).json(docs);
         return;
     }

     res.status(200).json({
       "msn" : "No existe el usario "
     });
   })
 });

 //eliminar un usuario

 router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualizar un usario

router.put(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['nombre', 'apellido', 'sexo','edad',
                     'email','numeroTelefono'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe  error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var user = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    edad : req.body.edad,
    email : req.body.email,
    numeroTelefono : req.body.numeroTelefono
  };
  User.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

router.patch(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user = {};
  for (var i = 0; i < keys.length; i++) {
    user[keys[i]] = req.body[keys[i]];
  }
  console.log(user);
  User.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});


module.exports = router;
