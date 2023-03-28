var express = require('express');
var router = express.Router();
const dexCtrl = require('../controllers/pokedex')

// localhost:3000/pokedex
router.get('/new', dexCtrl.new)
router.post('/', dexCtrl.create)
router.get('/:id', dexCtrl.show)


module.exports = router;
