const Pokedex = require('../models/pokedex')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

module.exports = {
    show,
    new: newPokedex,
    create,
    addPokemon,
    showPokemons
}
async function showPokemons(req,res){
    console.log('ENTER HERE');
    const availablePokemon = await Pokemon.find();
    res.render('pokedex/pokemon', {availablePokemon})
}

async function addPokemon(req,res){
    try{
    // const mypokedex = await Pokedex.findById(req.params.id)
    // mypokedex.pokemon.push(req.body.)
    console.log('Entering Add Pokemon');
    // const addingPokemon = req.body
    // const foundPokemon = await Pokemon.findOne({name: addingPokemon})
    // console.log(foundPokemon);
    // const pokedex = await Pokedex.findById(req.params.id);
    // pokedex.pokemon.push(foundPokemon.value);
    // console.log(pokedex);
    // res.redirect(`/pokedex/${pokedex._id}`)
    res.redirect(`pokedex/`)
    } catch (err) {
        console.log(err)
    }
}

async function show(req, res) {
    console.log("Entering function show")
    const pokedex = await Pokedex.findById(req.params.id).populate('pokemon');
    const pokemon = await Pokemon.find();
    res.render('pokedex/show' , {pokedex, pokemon})
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

