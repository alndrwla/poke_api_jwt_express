const uuid = require('uuid')
const crypto = require('../crypto')
const comparePassword = require('../crypto')

const userDatabase = {}

const registerUser = (userName, password) => {
  let hashedPwd = crypto.hashPasswordSync(password)

  userDatabase[uuid.v4()] = {
    userName: userName,
    password: hashedPwd
  }
}

const getUserIdFromUserName = (userName) => {
  for (let user in userDatabase) {
    if (userDatabase[user].userName == userName) {
      return userDatabase[user]
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
  console.log(`Checking user credentials for ${userName}`);
  
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