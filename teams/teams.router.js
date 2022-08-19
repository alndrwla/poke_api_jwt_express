const express = require('express')
const router = express.Router()
const axios = require('axios').default

const teamsController = require('./teams.controller')
const { getUser } = require('../auths/user.controller')

router.route('/')
  .get((req, res) => {
      let user = getUser(req.user.userId)
      res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
      })
  })
  .put((req, res) => {
    teamsController.setteam(req.user.userId, req.body.team)
    res.status(200).send()
  })

router.route('/pokemons')
  .post((req, res) => {
    let pokemonName = req.body.name

    console.log(`call`);
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then(function(response){

      let pokemon = {
        name: pokemonName,
        pokedexNumber: response.data.id
      }

      teamsController.addPokemon(req.user.userId, pokemon)

      res.status(201).json(pokemon)
    })
    .catch(function(err){
      res.status(400).json({
        message: err
      })
    })

  })

router.route('/pokemons/:pokeid')
  .delete((req, res) => {
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid)
    res.status(200).send("Delete")
  })

exports.router = router