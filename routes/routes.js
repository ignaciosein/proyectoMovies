const router = require("express").Router();
const pages = require("../controllers/pages")

router.get("/", pages.home);
router.post("/", pages.postHome)




module.exports = router;