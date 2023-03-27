const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

async function index (req, res, next) {
    const poke = await fetch(`${ROOT_URL}`)
    .then(res => res.json())
  res.render('PokeViews/index', { poke });
}

module.exports = {
    index
}