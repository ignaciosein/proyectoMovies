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
  },
  getDashboard: (req, res) => {
    res.status(200).render("home");
    // req.body.loginUser;
  },
  postSearch: async (req, res) => {
    let movie = req.body.peliculaBuscar;

    let data = await pelis.getMovie(
      `http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`
    );

    let arrayVacio = [];

    for (let index = 0; index < data.Search.length; index++) {
      let idDePelis = data.Search[index].imdbID;

      let data2 = await pelis.getMovie(
        `http://www.omdbapi.com/?i=${idDePelis}&apikey=${apiKey}`
      );

      let array = await arrayVacio.push(data2);
    }


    /* console.log(arrayVacio.Ratings[0].Value); */ //// PARA ACCEDER A LOS RATINGS DE LAS PELICULAS

    res.status(200).render("search", { arrayVacio });
  },
  getMovies: async (req, res) => {
    let tituloDePelicula = req.params.title;
    let data = await pelis.getMovie(`http://www.omdbapi.com/?t=${tituloDePelicula}&apikey=${apiKey}`);
    res.status(200).render('film', data);
  },
  getCreateMovie: (req, res) => {
    res.status(200).render("createMovie");
  },
  postCreateMovie: async (req, res) => {
    const movie = new Movies({
      Title: req.body.title,
      Year: req.body.year,
      Director: req.body.director,
      Genre: req.body.gender,
      Runtime: req.body.duration,
      Poster: req.body.image
    })
    let result = await movie.save((err) => {
      try {
        if (err) {
          let mError = err.message.split(':')[0]
          res.status(400).render("message", { type: "Error: ", message: `${mError}`, link: req.url, flag: true })
        } else {
          res.status(200).render("message", { type: "Info: ", message: `Información introducida correctamente`, link: req.url, flag: true })
        }
      }catch(error){
        res.status(500).render("message", { type: "Error: ", message: `${error.message}`, link: req.url, flag: true })
      }
    })
  },
  putMovie: (req, res) => {
    res.status(200).render("home");
    // req.body.loginUser;
  },
  deleteMovie: (req, res) => {

    Movies.findOneAndRemove({ title: req.params.title }, function (err) { });

    res.status(200).render("deleteFilm");
    // req.body.loginUser;
  },
  getSearch: (req, res) => {
    res.status(200).render("search");
    // req.body.loginUser;
  },
  getSearchTitle: async (req, res) => {
    let filmTitle = req.params.title;

    let cleanTitle = await filmTitle
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();

    let data = await pelis.getMovie(
      `http://www.omdbapi.com/?t=${cleanTitle}&apikey=${apiKey}`
    );

    let peliculaname = data.imdbID;

    let data2 = await pelis.getMovie(
      `http://www.omdbapi.com/?i=${peliculaname}&apikey=${apiKey}`
    );

    console.log(data2);

    res.status(200).render("searchAllDetails", data2);
    // req.body.loginUser;
  },
  getMovies: async (req, res) => {
    let tituloDePelicula = req.params.title;
    let data = await pelis.getMovie(
      `http://www.omdbapi.com/?t=${tituloDePelicula}&apikey=${apiKey}`
    );
    res.status(200).render("film", data);
  },
  getLocalMovies: async (req, res) => {
    let resultM = await logica.loadlLocalMovies();
    res.status(200).render("admin",{resultM});
  },
  postMakeMovie: (req, res) => {
    res.status(200).render("home");
    // req.body.loginUser;
  },
  putMovie: async(req, res) => {
    let data = req.body 
    let update = await Movies.findOneAndUpdate({IdPelicula: data.IdPelicula}, data, (err,data)=>{
      try{
        if(err){
          res.status(400).render("message", { type: "Error: ", message: `Error`, link: req.url, flag: true })
         }else{
          console.log('DATA', data)
          res.redirect(303,'/admin')
         }
      }catch(error){
        res.status(500).render("message", { type: "Error: ", message: `${error.message}`, link: req.url, flag: true })
      }
    })
  
  },
  delMovie: (req, res) => {
    res.status(200).render("home");
    // req.body.loginUser;
  },
  getEditMovie: async(req,res)=>{
    let id = parseInt(req.query.data)
    let data = await logica.findOneLocalMovies(id)
    res.status(200).render('editMovie',{data});
    /* res.status(200).send(data); */
  }
};

module.exports = pages;