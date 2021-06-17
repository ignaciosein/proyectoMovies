const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
const Movies = require("../models/schemas")
const apiKey = process.env.APIKEY;

const pages = {
  home: (req, res) => {
    res.status(200).render("home");
  },
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
        res.status(200).render("message", { type: "Error", message: "Se ha producido un error al generar el token", link: req.url, flag: true })
      }
    } else {
      /* res.status(400).send('USAURIO NO EXISTE') */ //redireccionar a la plantilla de registro
      res.status(200).render("message", { type: "Error", message: "Usuario password incorrecta", link: req.url, flag: true })
    }
  },
  postSingUp: async (req, res) => {
    const user = {
      name: req.body.singUpUser,
      email: req.body.singUpEmail,
      password: logica.cryptoW(req.body.singUpPass),
      repassword: logica.cryptoW(req.body.singUpRePass)
    }   
    /* if (!logica.getUser(user)) {
      let conn; 
    } else {
      res.status(400).render('message',{ type: "Error: ", message: "El usuario ya existe", link: req.url, flag: true })
    } */
  }
};

module.exports = pages;
