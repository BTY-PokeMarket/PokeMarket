const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokedexSchema = new Schema({
    name: String,
    numberOfPokemon: Number,
    totolCost: Number,
    pokemon: [{
        type: Schema.Types.ObjectId,
        ref: 'Pokemon'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Pokedex', pokedexSchema);