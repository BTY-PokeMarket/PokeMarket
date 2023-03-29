const User = require('../models/user')
const Pokedex = require('../models/pokedex')

module.exports = {
    index
}

async function index(req, res, next){
    try {
    console.log('getting to trainers index');
    const trainers = await Pokedex.find({});
    // if statement where if user is not logged in
    // pokedex = something
    // else
    // pokedex = vvvvvv
    // if(req.user){
    // const pokedex = await Pokedex.findOne({ user: req.user.id });
    // } else {
    //     // const pokedex = 0;
    // }
    console.log(trainers);
    res.render('trainers/index' , {trainers})
    } catch(err){
        console.log(err)
        res.sendStatus(500);
}
}