const teamsDatabase = {}

const bootstrapTeam = (userId) => {
  teamsDatabase[userId] = []
}

const getTeamOfUser = (userId) => {
  return teamsDatabase[userId]
}

const addpokemon = (userId, pokemonName) => {
  teamsDatabase[userId].push({name: pokemonName})
}

const setteam = (userId, team) => {
  teamsDatabase[userId] = team
}

exports.addpokemon = addpokemon
exports.setteam = setteam
exports.bootstrapTeam = bootstrapTeam
exports.getTeamOfUser = getTeamOfUser