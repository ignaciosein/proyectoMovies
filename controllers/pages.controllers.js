const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
<<<<<<< HEAD
const Movies = require("../models/schemas")
const apiKey = process.env.APIKEY;
=======
const userModel = require('../models/user.model.MySQL')
var bcrypt = require('bcryptjs');
const userMySQL = require("../models/user.model.MySQL");
/* const Movies = require("../models/schemas") */
/* const apiKey = process.env.APIKEY; */
>>>>>>> 3929ece550455ed1621d5bc94c938592d407f94b

const pages = {
  home: (req, res) => {
    res.status(200).render("home");
  },
<<<<<<< HEAD
  postLogin: (req, res) => {
    const user = {
      user: req.body.loginUser,
      password: req.body.loginPasswordUser,
    };
    if (logica.validateUser(user)) {
      if (logica.generateToken(user)) {
        let token = logica.generateToken(user);
        res.cookie('token', token);
        if (logica.getRolUser(user) == "admin") {
          /* res.status(200).send(`Aqui va la pantalla del ADMIN ${token}`) */
          res.redirect("admin")
          /*     res.status(200).render("admin") //plantilla admin  */
        } else if (logica.getRolUser(user) == "user") {
          /* res.status(200).send(`Aqui va la pantalla del USER ${token}`) */
          res.status(200).render("user") //plantilla user
        }
      } else {
        /* res.status(400).send('Aqui va el ERROR del TOKEN') */
        res.status(200).render("message", { tipo: "Error", message: "Se ha producido un error al generar el token", link: req.url, flag: true })
      }
    } else {
      /* res.status(400).send('USAURIO NO EXISTE') */ //redireccionar a la plantilla de registro
      res.status(200).render("message", { tipo: "Error", message: "Usuario password incorrecta", link: req.url, flag: true })
    }
  },
  postSingUp: (req, res) => {
    const user = {
      user: req.body.loginUser,
      email: req.body.emailUser,
      password: req.body.loginPasswordUser
    }
    console.log(user.user)
    if (!logica.getUser(user)) {
      if (logica.createUser(user)) {
        //si todo va bien se devuelve la página de inicio del usuario
        res.status(200).send('Usuario no existe OOKKK')
      } else {
        res.status(400).send('ERROR AL CREAR EL USUARIO')
      }
    } else {
      res.status(400).send('USAURIO YA EXISTE')
=======
  postLogin: async (req, res) => {
    const user = {
      email: req.body.loginEmail,
      password: req.body.loginPasswordUser,
    };
    try{
      const data = await userModel.getRowUser(req.body.loginEmail)
      if(data==undefined){
        res.status(403).render('message',{ type: "Error: ", message: "Usuario no registrado, registrate para continuar", link: '/', flag: true })
      }else{
        if(data.hasOwnProperty('numError')){
          res.status(500).render('message',{ type: "Error: ", message: "No se puede ejecutar la acción, intentelo más tarde", link: '/', flag: true }) 
        }else{
            if(data.password == undefined){
              res.status(403).render('message',{ type: "Error: ", message: "Usuario no registrado, registrate para continuar", link: '/', flag: true })
            }else{
              bcrypt.compare(user.password, data.password, function(err, resp) {
                if (err){
                  res.status(500).render('message',{ type: "Error: ", message: "No se puede ejecutar la accíon de autenticar, intentelo más tarde", link: '/', flag: true })
                }else{
                  if (resp){
                    let newToken = logica.generateToken(user.mail,data.admin)
                    let updateResult = async() =>{
                      let result = await userMySQL.insertNewToken(user.email,newToken)
                      return result
                    } 
                    let updateToken = updateResult()
                    try{
                      if(updateToken == undefined){
                        console.log('undefined: ' ,updateToken)
                        res.status(403).render('message',{ type: "Error: ", message: "No se registra la autenticacion, intentolo más tarde", link: '/', flag: true })
                      }else{
                        if(updateToken.hasOwnProperty('numError') ){
                          console.log('numError: ' ,updateToken)
                          res.status(500).render('message',{ type: "Error: ", message: "No se puede escribir la autenticacion, intentelo más tarde", link: '/', flag: true }) 
                        }else{
                          data.admin==0?res.cookie('token',newToken).status(200).render('dashboard'):res.cookie('token',newToken).status(200).render('admin')
                        }
                      }
                    }catch(err){
                      res.status(500).render('message',{ type: "Error: ", message: "No se puede ejecutar la accíon de autenticar, intentelo de nuevo", link: '/', flag: true })
                    }
                  } else {
                    res.status(403).render('message',{ type: "Error: ", message: "Password incorrecta", link: '/', flag: true })
                  }
                }
              });
            }
        }
      }
    }catch(err){
      console.log(err)
      res.status(500).render('message',{ type: "Error: ", message: "Ocurrio un error inesperado :(", link: '/', flag: true })  
    }
  },
  postSingUp: async (req, res) => {
    const user = {
      name: req.body.singUpUser,
      email: req.body.singUpEmail,
      password: logica.cryptoW(req.body.singUpPass),
      admin: 0,
      token: logica.generateToken(req.body.singUpEmail,0)
    }
    const dataUser = Object.values(user)
    try{
      const data = await userModel.existUser(req.body.singUpEmail)
      if(data==undefined){
        try{
          const data = await userModel.createUser(dataUser);
          if(data.affectedRows==1){
            res.cookie('token', user.token).status(200).render('message',{ type: "Info: ", message: "Usuario creado correctamente", link:'/dashboard', flag: true })
          }else{
              res.status(403).render('message',{ type: "Error: ", message: "No se puede crear el usuario, inténtelo más tarde.", link: '/', flag: true }) 
          } 
        }catch(error){
          res.status(500).render('message',{ type: "Error: ", message: "El usuario no fue creado :(", link: '/', flag: true }) 
        }
      }else{
        if(data.hasOwnProperty('numError')){
          res.status(500).render('message',{ type: "Error: ", message: "No se puede ejecutar la acción, intentelo más tarde", link: '/', flag: true }) 
        }else{
          res.status(403).render('message',{ type: "Error: ", message: "Usuario ya registrado, inicia sesión para continuar", link: '/', flag: true }) 
        }
      }
    }catch(err){
      console.log(err)
      res.status(500).render('message',{ type: "Error: ", message: "Ocurrio un error inesperado :(", link: '/', flag: true }) 
>>>>>>> 3929ece550455ed1621d5bc94c938592d407f94b
    }
  }
};

module.exports = pages;
