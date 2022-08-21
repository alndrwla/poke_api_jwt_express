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
  return new Promise((resolve, reject) => {
    if(teamsDatabase[userId][index]){
      teamsDatabase[userId].splice(index, 1)
    }
    resolve()
  })
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
      reject('Already have 6 pokemon')
    }else{
      teamsDatabase[userId].push(pokemon)
      resolve()
    }
  })
}

const setTeam = (userId, team) => {
  return new Promise((resolve, reject) =>{
    teamsDatabase[userId] = team
    resolve()
  })
}

exports.addPokemon = addPokemon
exports.setTeam = setTeam
exports.bootstrapTeam = bootstrapTeam
exports.getTeamOfUser = getTeamOfUser
exports.cleanUpTeam = cleanUpTeam
exports.deletePokemonAt = deletePokemonAt