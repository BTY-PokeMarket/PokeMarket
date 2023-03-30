const ROOT_URL = 'https://pokeapi.co/api/v2/pokemon'
const Pokedex = require('../models/pokedex')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')


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

async function pokemonDetail(req, res) {
    try {
        const pokedex = await Pokedex.findOne({ user: req.user.id });
        const foundPokemon = await Pokemon.findById(req.params.id);
        const pokemon = await fetch(`${ROOT_URL}-species/${foundPokemon.dex}`)
            .then(res => res.json())
        const sprite = await fetch(`${ROOT_URL}/${foundPokemon.dex}`)
            .then(res => res.json())
        res.render('pokedex/details', { pokemon, sprite, pokedex, foundPokemon })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

async function showPokemons(req, res) {
    const pokedex = await Pokedex.findById(req.params.id);
    const availablePokemon = await Pokemon.find({ _id: { $nin: pokedex.pokemon } }).sort('dex');
    res.render('pokedex/pokemon', { availablePokemon, pokedex })
}

async function addPokemon(req, res) {
    try {
        const pokedex = await Pokedex.findOne({ user: req.user.id });
        const foundPokemon = await Pokemon.findOne({ dex: req.body.pokemonId })
        const myPokedex = pokedex.pokemon
        myPokedex.push(foundPokemon);
        await pokedex.save();
        res.redirect(`/pokedex/${pokedex._id}`)
    } catch (err) {
        console.log(err)
    }
}

async function show(req, res, next) {
    const pokedex = await Pokedex.findById(req.params.id).populate('pokemon');
    const pokemon = await Pokemon.find();
    const availablePokemon = await Pokedex.find({ pokemon });
    res.render('pokedex/show', { pokedex, pokemon, availablePokemon })
}

async function newPokedex(req, res) {
    const pokedex = await Pokedex.findOne({ user: req.user.id });
    res.render('pokedex/new')
}

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.pokecoins = 50;
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

async function deletePokedex (req,res) {
   try { 
    const user = req.user;
    const p1 = Pokedex.deleteOne({user: req.user})
    let results = await Promise.all([p1]);
    console.log(user)
    console.log(results)
    res.redirect('/trainers')
   } catch (err) {
    console.log(err)
    res.redirect('pokedex/new');
    }
}

async function edit (req, res) {
    try {
    res.render('pokedex/edit')
    } catch (err) {
     console.log(err)
    res.redirect('/pokemon');
    }
}

async function updatePokedexName (req, res) {
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