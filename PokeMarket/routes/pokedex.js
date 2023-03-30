var express = require('express');
var router = express.Router();
const dexCtrl = require('../controllers/pokedex')

// DELETE ROUTES
// localhost:3000/pokedex/
router.delete('/:id', dexCtrl.delete);
router.delete('/', dexCtrl.deletePokedex)


router.post('/:id/edit', dexCtrl.updatePokedexName)

// POST ROUTES
router.post('/:id', dexCtrl.addPokemon)
router.post('/', dexCtrl.create)

// GET ROUTES
router.get('/new', dexCtrl.new)
router.get('/:id/pokemon/:id/details', dexCtrl.pokemonDetail)
router.get('/:id/pokemon', dexCtrl.showPokemons)
router.get('/:id/edit', dexCtrl.edit)
router.get('/:id', dexCtrl.show)

module.exports = router;
