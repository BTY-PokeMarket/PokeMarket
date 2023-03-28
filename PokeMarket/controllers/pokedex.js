const Pokedex = require('../models/pokedex')
const User = require('../models/user')

module.exports = {
    show,
    new: newPokedex,
    create
}

async function show(req, res) {
    console.log("Entering function show")
    const pokedex = await Pokedex.findById(req.params.id);
    res.render('/pokedex/show', {pokedex})
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

