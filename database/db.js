const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.projectMoviesDB, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex : true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));







/* const mongoose = require('mongoose')
require ("dotenv").config()
const conectionString = process.env.projectMoviesDB


mongoose.connect(conectionString ,{
  useNewUrlParser: true ,
  useUnifiedTopology: true ,
  useCreateIndex: true
})
.then(() => {
  
  console.log('Database connected');
}).catch(err => {

  console.log(err);

})


 */





/* const MongoClient = require("mongodb").MongoClient;
 
const url = "mongodb://localhost:27017/";
 
//esto creara la base de datos de nombhre"database" y con collecion "mensajes"
MongoClient.connect(url, { useUnifiedTopology: true } ,function(err, db) {
  if (err) throw err;
  const dbo = db.db("movies"); */

 
  
/*   dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });  
 */

  ///COLECCION PARA USERS
/*     let myobj = [
    { 
     name: 'John',
     password: 'pass',
     email: "email",
     role: "rol"
    
    },
    
  ]; */

  /////////COLECCION PARA FILMS///////////

 /*  let myobj = [
    { 
     title: 'John',
     year: 'pass',
     director: "email",
     duration: "rol",
     gender: "genero"
    
    },
    
  ]; */

  /////////COLECCION PARA FAVORITOS///////////

/*      let myobj = [
    { 
     user: 'emailuser',
     film: [{}],
       
    },
    
  ];  

  dbo.collection("favmovies").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });  

   */





 ////////////////////////////BUSCAR EN LA BASE DE DATOS//////////////////////

 /* dbo.collection("mensajes").findOne({name: "Chuck"}, function(err, result) {
    if (err) throw err;
    console.log(`Nombre: ${result.name} Mensaje: ${result.message}`);
    db.close();
  }); */

  /////////////BORRAR EN LA BASE DE DATOS///////////////
/*   dbo.collection("mensajes").deleteOne({name: "Michael"}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
 */

   /////////////BUSCAR POR ORDEN DESCENDENTE///////////////
  /*  let mysort = {name: -1}
   dbo.collection("mensajes").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log("*****Descendente******")
    console.log(result);
    db.close();
  });
 */
/* }); */