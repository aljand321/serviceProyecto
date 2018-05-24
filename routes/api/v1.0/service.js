var express = require('express');
var router = express.Router();
var _ = require("underscore");


var User = require("../../../database/collections/user");
var Inmuebles = require("../../../database/collections/inmuebles");
var Prueba = require("../../../database/collections/prueba");

//Prueba

/*router.post("/prueba", (req, res) => {

  var prueba = {
    Title : req.body.Title,
    Year : req.body.Year,
    imdbID : req.body.imdbID,
    Type : req.body.Type,
    Poster : req.body.Poster
  };
  var pruebaData = new Prueba(prueba);

  pruebaData.save().then( () => {
      res.status(200).json({
        "msn" : "Registrado con exito"
      });
  });

});*/

//ruta para listar los libros mas la informacion completaa del autor
router.get("/prueba", (req, res, next) => {
  //aqui utilizamos populate() para poblar el parametro "autor" con toda la info acerca del mismo
  Prueba.find({}).populate("user").exec( (error, docs) => {
    //checkeamos hay error de algun tipo
    if (error) {
      //devolvemos el error;
      res.status(400).json({error : error});return;
    }else{
      res.status(200).json({

          //Podriamos devolver los documentos tal cual los recibimos;
          //pero tb podemos remapearlos (si vale el termino) segun nuestros requerimientos
          //Por ej. : usamos la funcion map() de javascript ;

        Prueba : docs.map(doc => {
          return {
            //aqui reesctructuramos cada documento
            detalle : {

              Title : doc.Title,
              Year : doc.Year,
              imdbID : doc.imdbID,
              Type : doc.Type,
              Poster : doc.Poster
            },

            //Aqui tambien podemos devolver algun tipo de mensaje u otro que veamos conveniente

          }
        })
      });
    }
  })
});

//mostrar usuarios

router.get("/prueba", (req, res, next) =>{
  Prueba.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
});



//Un pequeño help us
//funcion que permite controlar con Regex que el id cumpla con el formato ObjectId de mongo
router.param(function(param,validator){
  return function(req,res,next,val){
    //hacemos la validacion con  .test() propio de regex y comparamos
    if (validator.test(val) == true) {
      next();
    }else{
      //si no cumple devolvemos la respuesta de error
      res.status(400).json({error : "El id " + val + " , No cumple con el formato requerido"});
    }
  }
});

router.param('id',/^[a-z0-9]{24}$/);

//añadiendo a usario

router.post("/user", (req, res) => {

  var user = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    email : req.body.email,
    numeroTelefono : req.body.numeroTelefono,
    ciudad : req.body.ciudad,
    direccionActual : req.body.direccionActual,
    password : req.body.password
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
  var oficialkeys = ['nombre', 'apellido','email','numeroTelefono',
                    'password'];
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
    email : req.body.email,
    numeroTelefono : req.body.numeroTelefono,
    ciudad : req.body.ciudad,
    direccionActual : req.body.direccionActual,
    password : req.body.password

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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//para el servicio de las casas

//añadiendo inmuebles

router.post("/inmuebles", (req, res) => {

  var inmuebles = {

    tipo : req.body.tipo,
    estado : req.body.estado,
    precio : req.body.precio,
    ciudad : req.body.ciudad,
    region : req.body.region,
    ubicacion : req.body.tiubicacionpo,
    direccion : req.body.direccion,
    descripcion : req.body.descripcion,
    cantidadCuartos : req.body.cantidadCuartos,
    cantidadBaños : req.body.cantidadBaños,
    garage : req.body.garage,
    superficie : req.body.superficie,
    correo : req.body.correo
  };
  User.findOne({email : req.body.correo}).exec((error, docs) => {
    //User.findOne({
    if(error){
      res.status(200).json({
        "msn" : error
      })
      return
    }
    if(docs != null){
      var id= docs._id;
      inmuebles.user = id;
      //console.log(inmuebles);
      var casaData = new Inmuebles(inmuebles);
      casaData.save().then( () => {
          res.status(200).json({
            "msn" : "Registrado con exito"
          })
      }).catch((err) => {
        res.status(400).json({
          "msn" : err
        })
      });
    }
    else{
      res.status(200).json({
        "msn" : "El usuario no esta Registrado"
      })
    }
  })
  });


//mostrar inmuebles+-

/*router.get("/inmuebles", (req, res, next) =>{
  Inmuebles.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
});*/

//ruta para listar los libros mas la informacion completaa del autor
router.get("/inmuebles", (req, res, next) => {
  //aqui utilizamos populate() para poblar el parametro "autor" con toda la info acerca del mismo
  Inmuebles.find({}).populate("user").exec( (error, docs) => {
    //checkeamos hay error de algun tipo
    if (error) {
      //devolvemos el error;
      res.status(400).json({error : error});return;
    }else{
      res.status(200).json({

          //Podriamos devolver los documentos tal cual los recibimos;
          //pero tb podemos remapearlos (si vale el termino) segun nuestros requerimientos
          //Por ej. : usamos la funcion map() de javascript ;

        Inmuebles : docs.map(doc => {
          return {
            //aqui reesctructuramos cada documento
            detalleInmueble : {

              tipo : doc.tipo,
              estado : doc.estado,
              precio : doc.precio,

              superficie : doc.superficie
            },
            detalleUser : doc.user,
            //Aqui tambien podemos devolver algun tipo de mensaje u otro que veamos conveniente
            status : 'OK'
          }
        })
      });
    }
  })
});


// eliminar inmuebles

router.delete(/inmuebles\/[a-z0-9]{1,}$/, (req, res) => {
 var url = req.url;
 var id = url.split("/")[2];
 Inmuebles.find({_id : id}).remove().exec( (err, docs) => {
     res.status(200).json(docs);
 });
});
<<<<<<< HEAD
//id:_delusuario
router.post("/id_user", (req, res) => {
  User.findOne({nombre : req.body.user },"_id").exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
=======

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
