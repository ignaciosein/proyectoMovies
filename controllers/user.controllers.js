const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
const Movies = require("../models/schemas");
const sql = require("../models/sql");
const apiKey = process.env.APIKEY;

const user = {
  getDashboard: (req, res) => {
    res.status(200).render("dashboard");
  },
  getMovies: async (req, res) => {
    let tituloDePelicula = req.params.title;
    let data = await pelis.getMovie(
      `http://www.omdbapi.com/?t=${tituloDePelicula}&apikey=${apiKey}`
    );
    res.status(200).render("film", data);
  },
  postSearch: async (req, res) => {
    let movie = req.body.peliculaBuscar;
    let arrayVacio = [];

    let result = await Movies.findOne({ Title: movie }).exec();

    if (result == null) {
      console.log("NO EXISTE");

      let data = await pelis.getMovie(
        `http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`
      );

      for (let index = 0; index < data.Search.length; index++) {
        let idDePelis = data.Search[index].imdbID;
        let data2 = await pelis.getMovie(
          `http://www.omdbapi.com/?i=${idDePelis}&apikey=${apiKey}`
        );
        let array = await arrayVacio.push(data2);
      }
      console.log(arrayVacio);
      res.status(200).render("search", { arrayVacio });
    } else {
      console.log("EXISTE EN LOCAL");

      let objetoDePrueba = {
        Title: result.Title,
        Year: result.Year,
        Director: result.Director,
        Genre: result.Genre,
        Poster: result.Poster,
        imdbID: result.imdbID,
      };

      arrayVacio.push(objetoDePrueba);

      res.status(200).render("search", { arrayVacio });
    }
  },
  getSearch: (req, res) => {
    res.status(200).render("search");
  },
  getSearchTitle: async (req, res) => {
    let filmTitle = req.params.title;

    let result = await Movies.findOne({ Title: filmTitle }).exec();

    if (result === null) {
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
      res.status(200).render("searchAllDetails", data2);
    }
    let resultado2 = {
      Title: result.Title,
      Year: result.Year,
      Director: result.Director,
      Genre: result.Genre,
      Runtime: result.Runtime,
      Poster: result.Poster,
      imdbID: result.IdMovie,
    };

    res.status(200).render("searchAllDetails", resultado2);
  },
  getFavUserMovies: async (req, res) => {
    try {
      let email = "juampi@dasdas.com";

      let data = await sql.allFavMovies(email);
      let arrayVacio = [];
      for (let index = 0; index < data.length; index++) {
        console.log(data[index].idmovie);

        let idfilms = data[index].idmovie;

        let data2 = await pelis.getMovie(
          `http://www.omdbapi.com/?i=${idfilms}&apikey=${apiKey}`
        );
        await arrayVacio.push(data2);
      }
      res.status(200).render("favMovies", { arrayVacio });
    } catch (error) {
      console.log("Recibo", error);
    }
  },
  addFavUserMovies: async (req, res) => {
    try {
      let { movieId, Title } = req.params;

      let email = "juampi@dasdas.com";

      let data = await sql.checkFavMovies(movieId, email);

      console.log("Valor data ", data);

      if (data[0].contador > 0) {
        res.status(200).render("message", {
          type: "Error: ",
          message: `Esta pelicula ya existe en la base de datos`,
          link: `/search/${Title}`,
          flag: true,
        });
      } else {
        let data2 = await sql.addFavMovie(movieId, email);

        res.status(200).render("message", {
          type: "Info: ",
          message: `Se agregó la pelicula a la base de datos`,
          link: `/search/${Title}`,
          flag: true,
        });
      }
    } catch (error) {
      console.log("Recibo", error);
    }
  },
};

module.exports = user;
