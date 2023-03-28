const Pokedex = require('../models/pokedex')
const User = require('../models/user')

module.exports = {
    new: newPokedex
}

async function newPokedex(req, res){
    const newPokedex = new Pokedex(req.body);
    await newPokedex.save();
    const newUser = new User();
    newUser.googleId = req.user._id;
    newUser.avatar = req.user.avatar;
}