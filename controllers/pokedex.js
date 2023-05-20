const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon'
const Pokedex = require('../models/pokedex')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

// SHOW NEW POKEDEX FORM
async function newPokedex(req, res) {
    res.render('pokedex/new')
}

// CREATE POKEDEX
// creating the pokedex with user inputted data
async function create(req, res) {
    try {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.pokecoins = 50;
        req.body.totalCost = 0;
        const newPokedex = new Pokedex(req.body);
        await newPokedex.save();
        const user = req.user
        user.pokedex = newPokedex._id;
        await user.save();
        res.redirect(`/pokedex/${newPokedex._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('pokedex/new');
    }
}

// DELETE POKEDEX
// delete pokedex from database
// removes the reference of the user's deleted pokedex from the user database
async function deletePokedex(req, res) {
    try {
        const p1 = Pokedex.deleteOne({ user: req.user })
        await User.updateOne({ _id: req.user.id }, { $unset: { pokedex: 1 } })
        await Promise.all([p1]);
        res.redirect('/trainers')
    } catch (err) {
        console.log(err)
        res.redirect('pokedex/new');
    }
}

// SHOW USER POKEDEX
// populates the pokedex screen
async function show(req, res, next) {
    const pokedex = await Pokedex.findById(req.params.id).populate('pokemon');
    const pokemon = await Pokemon.find();
    const availablePokemon = await Pokedex.find({ pokemon });
    res.render('pokedex/show', { pokedex, pokemon, availablePokemon })
}

// SHOW POKEMON DETAILS
async function pokemonDetail(req, res) {
    try {
        const userPokedex = await Pokedex.findOne({ user: req.user.id });
        const foundPokemon = await Pokemon.findById(req.params.id);
        const pokemon = await fetch(`${ROOT_URL}-species/${foundPokemon.dex}`)
            .then(res => res.json())
        const sprite = await fetch(`${ROOT_URL}/${foundPokemon.dex}`)
            .then(res => res.json())
        res.render('pokedex/details', { pokemon, sprite, userPokedex, foundPokemon })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// SHOW AVAILABLE POKEMON THAT USER CAN ADD
async function showPokemons(req, res) {
    const pokedex = await Pokedex.findById(req.params.id);
    const availablePokemon = await Pokemon.find(
        { _id: { $nin: pokedex.pokemon }, value: { $lte: pokedex.pokecoins } }
    ).sort('dex');
    res.render('pokedex/pokemon', { availablePokemon, pokedex })
}

// ADD POKEMON FROM DETAIL PAGE
// Keep track of pokecoins used
async function addPokemon(req, res) {
    try {
        const pokedex = await Pokedex.findOne({ user: req.user.id });
        const foundPokemon = await Pokemon.findOne({ dex: req.body.pokemonId })
        const myPokedex = pokedex.pokemon
        myPokedex.push(foundPokemon);
        if (pokedex.pokecoins >= 0) {
            pokedex.pokecoins -= foundPokemon.value;
            pokedex.totalCost += foundPokemon.value;
        }
        await pokedex.save();
        res.redirect(`/pokedex/${pokedex._id}`)
    } catch (err) {
        console.log(err)
    }
}

// DELETE POKEMON FROM POKEDEX
async function deletePokemon(req, res) {
    const pokedex = await Pokedex.findOne({ user: req.user.id });
    const foundPokemon = await Pokemon.findOne({ dex: req.body.pokemonId })
    thisPokemon = pokedex.pokemon
    thisPokemon.remove(foundPokemon)
    pokedex.save().then(() => {
        res.redirect(`/pokedex/${pokedex._id}`)
    }).catch(function (err) {
        return next(err)
    })
}

// EDIT SCREEN
// render edit pokedex form
async function edit(req, res) {
    try {
        res.render('pokedex/edit')
    } catch (err) {
        console.log(err)
        res.redirect('/pokemon');
    }
}

// UPDATE POKEDEX NAME
// function updates the name of the pokedex
async function updatePokedexName(req, res) {
    try {
        const pokedex = await Pokedex.findById(req.params.id)
        pokedex.pokedexName = req.body.pokedexName;
        await pokedex.save()
        res.redirect(`/pokedex/${req.params.id}`)
    } catch (err) {
        res.redirect('/pokemon');
    }

}

module.exports = {
    show,
    new: newPokedex,
    create,
    addPokemon,
    showPokemons,
    pokemonDetail,
    delete: deletePokemon,
    deletePokedex,
    edit,
    updatePokedexName
}