const router = require('express').Router();
const peliculas = require('./peliculas');

router.get('/film/:title', peliculas.getPeli)
router.post('/searchAllDetails/', peliculas.postPeli)
router.put('/film/', peliculas.putPeli)
router.delete('/film/', peliculas.deletePeli)
router.all('*', (req, res) =>
  res
    .status(404)
    .json({ message: "Route does not exist", app: "Express-Routes" })
);

module.exports = router;