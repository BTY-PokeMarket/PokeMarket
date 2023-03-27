var express = require('express');
var router = express.Router();

const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
/* GET home page. */
router.get('/', async function (req, res, next) {
    const poke = await fetch(`${ROOT_URL}`)
    .then(res => res.json())
  res.render('index', { poke });
})
module.exports = router;
