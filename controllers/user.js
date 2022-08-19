const uuid = require('uuid')
const crypto = require('../crypto')
const comparePassword = require('../crypto')
const teams = require('./teams')

let userDatabase = {}

const cleanUpUsers = () => {
  userDatabase = {}
}

const registerUser = (userName, password) => {
  let hashedPwd = crypto.hashPasswordSync(password)
  let userId = uuid.v4()

  userDatabase[userId] = {
    userName: userName,
    password: hashedPwd
  }

  teams.bootstrapTeam(userId)
}

const getUser = (userId) => {
  return userDatabase[userId]
}

const getUserIdFromUserName = (userName) => {
  for (let user in userDatabase) {
    if (userDatabase[user].userName == userName) {
      let userData = userDatabase[user]
      userData.userId = user
      return userData
    }
  }
}

const addUser = (userName, password) => {
  crypto.hashPassword(password, (err, result) => {
    userDatabase[uuid.v4()] = {
      userName: userName,
      password: result
    }
  })
}

const checkUserCredentials = (userName, password, done) => {
  
  let user = getUserIdFromUserName(userName)
  if(user){
    console.log(`${user}`)
    crypto.comparePassword(password, user.password, done)
  }else{
    done('Missing user')
  }
}

exports.checkUserCredentials = checkUserCredentials
exports.registerUser = registerUser
exports.getUser = getUser
exports.getUserIdFromUserName = getUserIdFromUserName
exports.cleanUpUsers = cleanUpUsers