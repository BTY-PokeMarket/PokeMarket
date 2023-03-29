var express = require('express');
var router = express.Router();
const dexCtrl = require('../controllers/pokedex')

// localhost:3000/pokedex
router.get('/new', dexCtrl.new)
router.get('/:id', dexCtrl.show)
router.get('/id/pokemons', dexCtrl.showPokemons)

router.post('/', dexCtrl.create)
router.post('/:id', dexCtrl.addPokemon)

module.exports = router;
