const router = require("express").Router();
const pages = require("../controllers/pages")

router.get("/", pages.home);
router.post("/", pages.postLogin)
router.post("/singup", pages.postSingUp)




module.exports = router;