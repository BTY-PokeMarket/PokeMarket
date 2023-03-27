var express = require('express');
var router = express.Router();
const pokeCtrl = require('../controllers/pokemons')

/* GET home page. */
router.get('/', pokeCtrl.index)


module.exports = router;
