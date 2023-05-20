const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pokemonSchema = new Schema({
    name: String,
    element: [String],
    dex: Number,
    value: Number
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
