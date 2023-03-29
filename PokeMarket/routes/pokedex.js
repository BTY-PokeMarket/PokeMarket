var express = require('express');
var router = express.Router();
const dexCtrl = require('../controllers/pokedex')

// localhost:3000/pokedex
router.delete('/:id', dexCtrl.delete);

router.post('/:id', dexCtrl.addPokemon)
router.post('/', dexCtrl.create)

router.get('/new', dexCtrl.new)
router.get('/:id/pokemon/:id/details', dexCtrl.pokemonDetail)
router.get('/:id/pokemon', dexCtrl.showPokemons)
router.get('/:id', dexCtrl.show)







module.exports = router;
