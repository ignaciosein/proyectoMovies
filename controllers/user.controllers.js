const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
const Movies = require("../models/schemas")
const apiKey = process.env.APIKEY;

const user = {
    getDashboard: (req, res) => {
        res.status(200).render("home");
    },
    getMovies: async (req, res) => {
        let tituloDePelicula = req.params.title;
        let data = await pelis.getMovie(`http://www.omdbapi.com/?t=${tituloDePelicula}&apikey=${apiKey}`);
        res.status(200).render('film', data);
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
        res.status(200).render("search", { arrayVacio });
    },
    getSearch: (req, res) => {
        res.status(200).render("search");
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
        res.status(200).render("searchAllDetails", data2);;
    },
    getFavUserMovies: async (req, res) => {
        res.status(200).send('peliculas favoritas');
    }
}

module.exports = user;