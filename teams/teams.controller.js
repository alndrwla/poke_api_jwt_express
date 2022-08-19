let teamsDatabase = {}

const cleanUpTeam = () => {
  for (let user in teamsDatabase){
    teamsDatabase[user] = []
  }
}

const deletePokemonAt = (userId, index) => {
  if(teamsDatabase[userId][index]){
    teamsDatabase[userId].splice(index, 1)
  }

}

const bootstrapTeam = (userId) => {
  teamsDatabase[userId] = []
}

const getTeamOfUser = (userId) => {
  return teamsDatabase[userId]
}

const addPokemon = (userId, pokemon) => {
  teamsDatabase[userId].push(pokemon)
}

const setteam = (userId, team) => {
  teamsDatabase[userId] = team
}

exports.addPokemon = addPokemon
exports.setteam = setteam
exports.bootstrapTeam = bootstrapTeam
exports.getTeamOfUser = getTeamOfUser
exports.cleanUpTeam = cleanUpTeam
exports.deletePokemonAt = deletePokemonAt