const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon'
const Pokemon = require('../models/pokemon')


async function index (req, res, next) {
    // const poke = await fetch(`${ROOT_URL}?limit=10&offset=0`)
    // .then(res => res.json())
    try{
  const poke = await Pokemon.find().sort({dex: 1})
 res.render('PokeViews/index', {poke})
    } catch (err){
      console.log(err);
    res.sendStatus(500);
    }
}

async function show(req,res,next){
  try{
 const foundPokemon = await Pokemon.findById(req.params.id);
 const pokemon = await fetch(`${ROOT_URL}-species/${foundPokemon.dex}`)
 .then(res => res.json())
 const sprite = await fetch(`${ROOT_URL}/${foundPokemon.dex}`)
 .then(res => res.json())
 res.render('PokeViews/details', {pokemon, sprite})
  } catch (err){
    console.log(err);
    res.sendStatus(500);
  }

}

module.exports = {
    index,
    show
}