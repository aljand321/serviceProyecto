var express = require('express');

var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");
var fs = require('fs');
var User = require("../../../database/collections/user");
var Inmuebles = require("../../../database/collections/inmuebles");
var Prueba = require("../../../database/collections/prueba");
var Img = require("../../../database/collections/img");
var Mapa = require("../../../database/collections/mapa");

//Prueba


//var jwt = require("jsonwebtoken");

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null ,'./public/avatars')
  },
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, file.originalname + "-" +  Date.now() + ".jpg");
  }
});
var upload = multer({storage : storage}).single('img');
//Prueba*/

/*router.post("/prueba", (req, res) => {
<<<<<<< HEAD
=======
var Mapa = require("../../../database/collections/mapa");

//Prueba

router.post("/prueba", (req, res) => {
>>>>>>> 3213fc8086a4c832fb31a8c9e18e779913a0bb18
=======
>>>>>>> aa6ddf82e2b4b9b510e9667a0f8ef3cf3533c008
>>>>>>> b9614c55957c4140519dfde72a3dc9db0d9c5cb0

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

<<<<<<< HEAD
<<<<<<< HEAD
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

/*
>>>>>>> 3213fc8086a4c832fb31a8c9e18e779913a0bb18
=======

/*
=======
//mostrar usuarios


>>>>>>> 4872d41fca11dbed117e45ee5a8bb1ac2eb25f1e
>>>>>>> b9614c55957c4140519dfde72a3dc9db0d9c5cb0
router.get("/prueba", (req, res, next) =>{
  Prueba.find({}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});*/



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



//router.param('id',/^[a-z0-9]{24}$/);


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
 User.findOne({email : req.body.email}).exec( (error, docs) => {
   if(docs != null){
     res.status(200).json({
       "msn" : "el email ya esta en uso"
     });
   }
   else{
     if(error){
       res.status(401).json({
         "msn" : "servicio a fallado"
       });
     }
     else{
       var userData = new User(user);
       userData.save().then( () => {
           res.status(200).json({
             "msn" : "Registrado con exito"
           });
       });
     }
   }
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
//router.post(/inmuebles\/[a-z0-9]{1,}$/, (req, res) => {
  var inmuebles = {

    tipo : req.body.tipo,
    estado : req.body.estado,
    precio : req.body.precio,
    ciudad : req.body.ciudad,
    region : req.body.region,
    //ubicacion : "",
    //direccion : req.body.direccion,
    descripcion : req.body.descripcion,
    cantidadCuartos : req.body.cantidadCuartos,
    cantidadBaños : req.body.cantidadBaños,
    garage : req.body.garage,
    superficie : req.body.superficie,
    lat : req.body.lat,
    lon : req.body.lon,
    gallery: "",
    imagen : "",
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
      var id_in = casaData._id;
      casaData.save().then( () => {
          res.status(200).json({
            "msn" : "Registrado con exito",
            "imn" : id_in

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

// post inmuebles por id
router.post(/inmuebles_id\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
//router.post(/inmuebles\/[a-z0-9]{1,}$/, (req, res) => {
  var inmuebles = {

    tipo : req.body.tipo,
    estado : req.body.estado,
    precio : req.body.precio,
    ciudad : req.body.ciudad,
    region : req.body.region,
    //ubicacion : "",
    //direccion : req.body.direccion,
    descripcion : req.body.descripcion,
    cantidadCuartos : req.body.cantidadCuartos,
    cantidadBaños : req.body.cantidadBaños,
    garage : req.body.garage,
    superficie : req.body.superficie,
    lat : req.body.lat,
    lon : req.body.lon,
    gallery: "",
    imagen : "",
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
      var id_in = casaData._id;
      casaData.save().then( () => {
          res.status(200).json({
            "msn" : "Registrado con exito",
            "imn" : id_in

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


//tipo , precio , ciudad ,descripcion
router.get("/inmuebles_ecp", (req, res, next) =>{
  Inmuebles.find({}).exec( (error, docs) => {
      res.status(200).json({docs});
    })
  });


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


// eliminar inmuebles

router.get("/id_inm", (req, res, next) =>{
  Inmuebles.find({precio: "10000"}).exec( (error, docs) => {
      res.status(200).json(docs);
  })
});

router.get("/id_user", (req, res, next) =>{
  User.find({},"email").exec( (error, docs) => {
      res.status(200).json(docs);
  })
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

//mapas
router.post(/mapa\/[a-z0-9]{1,}$/, (req, res) => {
  var url= req.url;
  var id = url.split("/")[2];
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var mapa = {
    calle : req.body.street,
    descripcion : req.body.descripcion,
    lat : req.body.lat,
    lon : req.body.lon,
    vecinos : req.body.neighborhood,
    ciudad : req.body.city,
    contact: req.body.contact
  };
  var mapaData = new Mapa(mapa);

  mapaData.save().then( (rr) => {

    var mp = {
      ubicacion: new Array()
    }
    Inmuebles.findOne({_id:id}).exec( (error, docs) => {
      var dt = docs.ubicacion;
      var aux = new Array();
      if (dt.length == 1 && dt[0] == ""){
        mp.ubicacion.push("/api/v1.0/mapa/")
      }
      else {
        aux.push("/api/v1.0/mapa/");
        dt = dt.concat(aux);
        mp.ubicacion = dt;
      }
      Inmuebles.findOneAndUpdate({_id : id}, mp, (err, params) => {
          if(err){
            res.status(500).json({
              "msn" : "error"
            });
            return;
          }
          res.status(200).json(req.file);
          return;
      });
    });
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "mapa Registrado con exito "
    });
  });
});

router.patch(/inmuebles\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user = {};
  for (var i = 0; i < keys.length; i++) {
    user[keys[i]] = req.body[keys[i]];
  }
  console.log(user);
  Inmuebles.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      //"doc" : params.id
      return;
  });
});
//recuperar el array de la mapa
router.get(/mapa\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(id)
  Mapa.findOne({_id: id}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn": "Sucedio algun error en el servicio"
      });
      return;
    }
    else{
          res.status(200).json({docs});
    }
  });
});

//para cargar la imagen de los inmuebles

router.post("/userimg", (req, res) => {
  upload(req, res, (error) => {
    if(error){
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"

      });
    }else{
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        name : req.file.originalname,
        idhome: req.file.path,
        physicalpath : req.file.path,
        relativepath : "http://localhost:7777" + ruta
      };
      var imDato = new Img(img);
        imDato.save().then( () => {
          res.status(200).json( req.file);
        });
    }
  });
});


//en la url se envia con la id del inmueble registrado
//en key se pone img
router.post(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        idhome: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var home = {
          gallery: new Array(),
          imagen : new Array(),
          picture : new Array()
        }

        var foto = "http://localhost:7777" + ruta;

        console.log("ruta de la img"+" " +foto +" "+ "imagen llll ruta");

        Inmuebles.findOne({_id:id}).exec( (err, docs) =>{
          //console.log(docs);

          var data = docs.gallery;
          var ph = docs.imagen;
          var data_img = docs.picture;
          var aux = new  Array();
          var phaux = new Array();
          var daa_aux = new Array();
          if (data.length == 1 && data[0] == "") {
            //aqui se pone la ip de la maquina donde esta corriendo , es decir nuestra ip
            home.gallery.push("/api/v1.0/homeimg/" + infoimg._id);
            home.imagen.push("http://localhost:7777" + ruta );
            home.picture.push("/api/v1.0/homeimg/" + infoimg._id);
            //photo.imagen.push(picture);

          }
          //console.log("picture" +" "+ data_img[0]);
        /*  if(data_img.length == 0 && data_img[0] == "null"){
            home.picture.push("/api/v1.0/homeimg/" + infoimg._id);
          }*/

          else {
            // aqui tambien nuestra ip
            aux.push("/api/v1.0/homeimg/" + infoimg._id);
            phaux.push("http://localhost:7777" + ruta);
            daa_aux.push("/api/v1.0/homeimg/" + infoimg._id);
            //phaux.push(picture);
            data = data.concat(aux);
            ph = ph.concat(phaux);
            data_img = data.concat(daa_aux);
            home.gallery = data;
            home.imagen = ph;
          }
          Inmuebles.findOneAndUpdate({_id : id}, home, (err, params) => {
              if (err) {
                res.status(500).json({
                  "msn" : "error en la actualizacion de la imagen"
                });
                return;
              }
              res.status(200).json(
                req.file

              );
              return;
          });

        });
      });
    }
  });
});
//obtener la imagen
//en la url se envia con la id de la foto o imagen registrada
router.get(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(id)
  Img.findOne({_id: id}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn": "Sucedio algun error en el servicio"
      });
      return;
    }
    else{
      if(docs){
        //regresamos la imagen deseada
        var img = fs.readFileSync("./" + docs.physicalpath);
        //var img = fs.readFileSync("./public/avatars/img.jpg");
        res.contentType('image/jpeg');
        res.status(200).send(img);
        //regresamos la imagen deseada
      }
      else{
        res.status(424).json({
          "msn": "La solicitud falló, ,la imagen fue eliminada"
        });
        return;
      }
    }

  });
});

router.delete(/img\/[a-z0-9]{1,}$/, (req, res) => {
 var url = req.url;
 var id = url.split("/")[2];
Img.find({_id : id}).remove().exec( (err, docs) => {
     res.status(200).json(docs);
 });
});

//FIltrado
router.get("/inmuebles_f", (req, res, next) => {
  //query params
  var params = req.query;

  var precio = params.precio;
  console.log(precio);
  var over = params.over;
  console.log(over);

  if(precio == undefined && over == undefined){
    Inmuebles.find({lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
      res.status(200).json({
        info: docs
      });
    })
    return;
  }
 if(over == "equals"){
   //min<precio&max<precio
   console.log("---------->")
   Inmuebles.find({precio : precio, lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
     res.status(200).json({
        docs
     });
   })
   return;
 }
 else if (over == "true"){
   Inmuebles.find({precio: {$gt:precio}, lat: {$ne: null}, lon: {$ne: null}}).exec( (error, docs) => {
     res.status(200).json({
       info: docs
     });
   })
 }

});

//filtro simplificado
router.get('/filtro', (req, res, next) =>{
  var params = req.query.precio;
  var precio;
  var tipo ;
  console.log("msn"+params);
  if(params == "Casa"){
  Inmuebles.find( { precio : params} ).exec((err, docs) => {
    res.status(200).json({dosc});
    return;
  })
  }
});


//mapas
router.post("/mapa", (req, res) => {
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var mapa = {
    calle : req.body.street,
    descripcion : req.body.descripcion,
    precio : req.body.price,
    lat : req.body.lat,
    lon : req.body.lon,
    vecinos : req.body.neighborhood,
    ciudad : req.body.city,
    galeria: "",
    contact: req.body.contact
  };
  var mapaData = new Mapa(mapa);

  mapaData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "usuario Registrado con exito "
    });
  });
});


//FIltrado
//mostrar inmuebles por usuario
//poligonos para los remapearlos
module.exports = router;
