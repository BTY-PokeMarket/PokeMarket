const User = require('../models/user')
const Pokedex = require('../models/pokedex')

module.exports = {
    index
}

async function index(req, res, next){
    try {
    console.log('getting to trainers index');
    const trainers = await Pokedex.find({});
    const pokedex = await Pokedex.findOne({ user: req.user.id });
    console.log(pokedex);
    res.render('trainers/index' , {trainers , pokedex})
    } catch(err){
        console.log(err)
        res.sendStatus(500);
}
}