const axios = require('axios').default

const teamsController = require('./teams.controller')
const { getUser } = require('../auths/user.controller')

const getTeamFromUser = (req, res) => {
    let user = getUser(req.user.userId)
    res.status(200).json({
      trainer: user.userName,
      team: teamsController.getTeamOfUser(req.user.userId)
    })
  }

const setTeamToUser =  (req, res) => {
    teamsController.setteam(req.user.userId, req.body.team)
    res.status(200).send()
  }

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then(function (response) {

        let pokemon = {
          name: pokemonName,
          pokedexNumber: response.data.id
        }

        teamsController.addPokemon(req.user.userId, pokemon)

        res.status(201).json(pokemon)
      })
      .catch(function (err) {
        res.status(400).json({
          message: err
        })
      })

  }

const deletePokemonFromTeam = (req, res) => {
  teamsController.deletePokemonAt(req.user.userId, req.params.pokeid)
  res.status(200).send("Delete")
}

exports.getTeamFromUser = getTeamFromUser
exports.setTeamToUser = setTeamToUser
exports.addPokemonToTeam = addPokemonToTeam
exports.deletePokemonFromTeam = deletePokemonFromTeam