 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: String,
    element: String,
    dex: Number,
    value: Number
});

module.exports = mongoose.model('Pokemon', pokemonSchema);

/*
    _id: pokemon1
    name: 'Bulbasaur',
    element: String,
    dex: 1,
    value: 1

    _id: pokemon2
    name: 'Charmander',
    element: String,
    dex: 7,
    value: 1

*/