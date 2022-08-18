const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../auth')(passport)
const axios = require('axios').default

const teamsController = require('../controllers/teams')
const { getUser } = require('../controllers/user')

router.route('/')
  .get(passport.authenticate('jwt', { session: false }),
    (req, res) => {
      let user = getUser(req.user.userId)
      res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
      })
  })
  .put(passport.authenticate('jwt', { session: false }),
    (req, res) => {
    teamsController.setteam(req.user.userId, req.body.team)
    res.status(200).send()
  })

router.route('/pokemons')
  .post(passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    let pokemonName = req.body.name

    console.log(`call`);
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then(function(response){
      console.log(response.data.id);
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
    res.status(200).send("Exito")
  })

exports.router = router