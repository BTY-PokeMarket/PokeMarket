const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pokedexSchema = new Schema({
    pokedexName: String,
    numberOfPokemon: Number,
    pokemon: [{
        type: Schema.Types.ObjectId,
        ref: 'Pokemon'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: String,
    pokecoins: Number,
    totalCost: Number
}, {
    timestamps: true
});


module.exports = mongoose.model('Pokedex', pokedexSchema)
