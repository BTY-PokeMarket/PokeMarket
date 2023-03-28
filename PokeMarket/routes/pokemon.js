var express = require('express');
var router = express.Router();
const pokeCtrl = require('../controllers/pokemons')

// localhost:3000/pokemon
router.get('/', pokeCtrl.index)
router.get('/:id/details', pokeCtrl.show)


module.exports = router;
