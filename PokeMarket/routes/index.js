var express = require('express');
var router = express.Router();
const pokeCtrl = require('../controllers/pokemons')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pokemon')
})



module.exports = router;
