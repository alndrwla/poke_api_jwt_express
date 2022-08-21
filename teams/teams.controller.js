let teamsDatabase = {}

const cleanUpTeam = () => {
  return new Promise((resolve, reject) => {
    for (let user in teamsDatabase){
      teamsDatabase[user] = []
    }
    resolve()

  })
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
  return new Promise((resolve, reject) => {
    resolve(teamsDatabase[userId])
  })
}

const addPokemon = (userId, pokemon) => {
  return new Promise((resolve, reject) => {
    if (teamsDatabase[userId].length == 6) {
      reject()
    }
    
    teamsDatabase[userId].push(pokemon)
    resolve()
  })
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