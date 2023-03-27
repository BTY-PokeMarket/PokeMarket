const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon'
const Pokemon = require('../models/pokemon')


async function index (req, res, next) {
    // const poke = await fetch(`${ROOT_URL}?limit=10&offset=0`)
    // .then(res => res.json())
    const poke = await Pokemon.find();
  res.render('PokeViews/index', { poke });
}

async function show(req,res,next){
//  dex number of pokemon
// const foundPokemon = await Pokemon.findById(req.params.id);
// const pokemon = await fetch(`${ROOT_URL}-species/${foundPokemon.dex}`)
// .then(res => res.json())
// let flavorText = pokemon.flavor_text_entries[0]


// res.render('PokeViews/details', {pokemon})
}

module.exports = {
    index,
    show
}