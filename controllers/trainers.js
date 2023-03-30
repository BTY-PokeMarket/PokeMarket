const User = require('../models/user')
const Pokedex = require('../models/pokedex')


async function index(req, res, next) {
    try {
        const trainers = await Pokedex.find({});
        res.render('trainers/index', { trainers })
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

module.exports = {
    index
}