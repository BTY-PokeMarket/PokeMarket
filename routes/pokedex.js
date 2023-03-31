var express = require('express');
var router = express.Router();
const dexCtrl = require('../controllers/pokedex')
const ensureLoggedIn = require('../config/ensureLoggedIn');

// DELETE ROUTES
// localhost:3000/pokedex/
router.delete('/:id', ensureLoggedIn, dexCtrl.delete);
router.delete('/', ensureLoggedIn, dexCtrl.deletePokedex)

// POST ROUTES
router.post('/:id', ensureLoggedIn, dexCtrl.addPokemon)
router.post('/', ensureLoggedIn, dexCtrl.create)
router.post('/:id/edit', ensureLoggedIn, dexCtrl.updatePokedexName)

// GET ROUTES
router.get('/new', ensureLoggedIn, dexCtrl.new)
router.get('/:id/pokemon/:id/details', ensureLoggedIn, dexCtrl.pokemonDetail)
router.get('/:id/pokemon', ensureLoggedIn, dexCtrl.showPokemons)
router.get('/:id/edit', ensureLoggedIn, dexCtrl.edit)
router.get('/:id', dexCtrl.show)

module.exports = router;
