const router = require("express").Router();
const pages = require("../controllers/pages.controllers")
const user = require("../controllers/user.controllers")
const admin = require('../controllers/admin.controllers')

//Ruta de inicio
router.get("/", pages.home);
router.post("/", pages.postLogin)
router.post("/login", pages.postLogin)

//Rutas user 
router.get("/dashboard", user.getDashboard)
router.get("/movies", user.getMovies)
router.post("/search", user.postSearch)
router.get("/search", user.getSearch)
router.get("/search/:title", user.getSearchTitle)
router.get("/favMovies",user.getFavUserMovies)
router.get('/getMovie', user.getData)
 
//Rutas admin
router.get("/admin", admin.getLocalMovies)
router.get("/createMovie", admin.getCreateMovie)
router.post("/createMovie", admin.postCreateMovie)
router.get("/editMovie", admin.getEditMovie)
router.put("/editMovie/:id", admin.putMovie)
router.get("/deleteFilm/:title", admin.deleteMovie)
 
module.exports = router;