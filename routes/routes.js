const router = require("express").Router();
const pages = require("../controllers/pages")

router.get("/", pages.home);
router.post("/", pages.postHome)
 
router.get("/dashboard", pages.getDashboard)
router.get("/search", pages.getSearch)
router.get("/search/:title", pages.getSearchTitle)
router.get("/movies", pages.getMovies)

router.post("/signup", pages.postSignup)
router.post("/login", pages.postLogin)
router.post("/createMovie", pages.postMakeMovie)

router.put("/editMovie/:id", pages.putMovie)

router.delete("/editMovie/:id", pages.delMovie)

  

module.exports = router;