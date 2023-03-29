const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon'
const Pokedex = require('../models/pokedex')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

module.exports = {
    show,
    new: newPokedex,
    create,
    addPokemon,
    showPokemons,
    pokemonDetail
}
async function pokemonDetail(req,res){
    try{
        //  const pokedex
        //  if(pokedexOfTrainer does not equal logged in user id){
        //     pokedex = req.params.id
        // }
        // else vvvvvvvvvvvvvv
        const pokedex = await Pokedex.find({ user: req.user.id });
        const foundPokemon = await Pokemon.findById(req.params.id);
        const pokemon = await fetch(`${ROOT_URL}-species/${foundPokemon.dex}`)
        .then(res => res.json())
        const sprite = await fetch(`${ROOT_URL}/${foundPokemon.dex}`)
        .then(res => res.json())
        res.render('pokedex/details', {pokemon, sprite, pokedex})
         } catch (err){
           console.log(err);
           res.sendStatus(500);
         }
    
}

async function showPokemons(req,res){
    console.log('ENTER Show Pokemon');
    const pokedex = await Pokedex.findById(req.params.id);
    const availablePokemon = await Pokemon.find({ _id: { $nin : pokedex.pokemon } });
    res.render('pokedex/pokemon', {availablePokemon, pokedex})
}

async function addPokemon(req,res){
    console.log('Entering Add Pokemon');
    try{
    const pokedex = await Pokedex.findOne({ user: req.user.id });
    console.log(pokedex)
    const foundPokemon = await Pokemon.findOne({dex: req.body.pokemonId})
    const myPokedex = pokedex.pokemon
    console.log(myPokedex)
    myPokedex.push(foundPokemon);
    pokecoins = pokedex.pokecoins 
    console.log(pokecoins) //50
    await pokedex.save();
    res.redirect(`/pokedex/${pokedex._id}`)
    } catch (err) {
        console.log(err)
    }
}

async function show(req, res) {
    console.log("Entering function show")
    const pokedex = await Pokedex.findById(req.params.id).populate('pokemon');
    const pokemon = await Pokemon.find();
    const availablePokemon = await Pokedex.find({ pokemon });
    
    res.render('pokedex/show' , {pokedex, pokemon, availablePokemon})
}



async function newPokedex(req, res){
    res.render('pokedex/new')
}

async function create(req,res) {
    try {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.pokecoins = 50;
    const newPokedex = new Pokedex(req.body); 
    await newPokedex.save();
    console.log(newPokedex._id);
    res.redirect(`/pokedex/${newPokedex._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('pokedex/new');
    }
}

