<div align="center">

# WELCOME TO PokeMarket
### Built by: **[Woonchan Jung](https://www.linkedin.com/in/woonchanjung/), [Ryan Q Le](https://www.linkedin.com/in/ryanqle/), [Justin Navarro](https://www.linkedin.com/in/justin-navarro/)**

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
![Maintainer](https://img.shields.io/badge/Maintainer-woonchanjung-blue)
![Maintainer](https://img.shields.io/badge/Maintainer-ryanqle-blue)
![Maintainer](https://img.shields.io/badge/Maintainer-justinnavarr0-blue)
![Ask](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

![Follows](https://img.shields.io/github/followers/ryanqle.svg?style=social&label=Follow&maxAge=2592000)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)


## **[CLICK HERE TO CHECKOUT THE POKeMARKET!](https://pokemarket.herokuapp.com/pokemon)**

</div>

## What is PokeMarket?
PokeMarket is your own personal Pokedex that lets you save a collection of your favorite Pokemon using our sites own currency: Pokecoins! 

New users will receive 50 pokecoins when they create a Pokedex!

You'll be able to check out details such as the stats of your favorite Pokemon or how many Pokemon each individual user has. 

You can also check out other people's Pokedex collection.

<br />

## How to Use PokeMarket

First Log In Using a Google Account and create a Pokedex:

![LOGIN AND CREATE DEX](https://user-images.githubusercontent.com/107282884/229020774-1a244e1f-c0b0-459f-93ef-ff2aff930c23.gif)

Then Add Pokemon to your Pokedex!

![Add PokeMON TO POKEDEX](https://user-images.githubusercontent.com/107282884/229021275-e0912f5d-b6b1-4b39-95e6-5733ca3f1622.gif)

You can also delete Pokemon from your Pokedex:

![DELETE POKE](https://user-images.githubusercontent.com/107282884/229021883-75e65d8c-0760-4a70-b051-04e4203a748c.gif)

You can view a detailed look at any of the Pokemons base stats as well:

![Screenshot 2023-03-30 at 9 35 41 PM](https://user-images.githubusercontent.com/107282884/229023571-eb029f35-f25c-45cd-8661-318335212e16.png)

**  **


#### Favorite Snippets of Code
```
async function create(req, res) {
    try {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.pokecoins = 50;
        req.body.totalCost = 0;
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
```

This block of code was one of the main issues that halted the progression of our project. This is the function that creates a pokedex tied specifically to that user. Originally we tried to use OAuth to create a Pokedex for a user that logged in, but we werent able to access or manipulate the id of that specific pokedex when the user was created. This code allowed us to attach a pokedex to a user and not only reference back to it but manipulate it as well.     

```
async function addPokemon(req, res) {
    try {
        const pokedex = await Pokedex.findOne({ user: req.user.id });
        const foundPokemon = await Pokemon.findOne({ dex: req.body.pokemonId })
        const myPokedex = pokedex.pokemon
        myPokedex.push(foundPokemon);
        if(pokedex.pokecoins >= 0){
            pokedex.pokecoins -= foundPokemon.value;
            pokedex.totalCost += foundPokemon.value;
        }
        await pokedex.save();
        res.redirect(`/pokedex/${pokedex._id}`)
    } catch (err) {
        console.log(err)
    }
}
```

This function is the one that makes our app a "PokeMarket" by handling the "buying" functionality of the Pokecoins. We started users off with 50 Pokecoins for logging in and creating a new pokedex. When you try to add a Pokemon to your Pokedex the value of that Pokemon is deducted from your Pokecoins. 

#Honorable Mention of code:#
```
<a href="javascript:history.back()"> < Go Back </a>
```
This code is a very convienent way to navigate back one page in your site. Quite literally one of our (mainly Justin's) favorite pieces of code.  

## Roadmap

**[TRELLO](https://trello.com/invite/b/tsHLh6S1/ATTIf59bd7d87bd0b371880b8ee87fba221dC1E8C489/pokemarket)**

We plan on updating the styling a bit more to be a better reflection of a Pokedex.

Icebox features planned for the near future
- Naming Individual Pokemon
- Trading functionality between Users
- Comments and Likes on each persons Pokedex
- Query to search for a Pokemon
- Adding more than 1st Gen Pokemon
- Ability to sort by categories
- Music / Sound Effects on individual Pokemon


**Authors and Acknowledgements**

Authors:
- John
- Justin
- Ryan

Acknowledgements: 
- Kenneth C. (Lead Instructor)
- Matthew G. 
- Evan M.
- Payne F.

### About This Project

This is our 2nd project to demonstrate our ability to work in groups, utilize MongoDB/Mongoose and NodeJS/ExpressJS frameworks, and build a User Centric Application with CRUD functionality and Authentication using OAuth.

Written for **General Assembly Software Engineering Immersive Bootcamp**
