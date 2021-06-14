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
    }
  }
};

module.exports = pages;
