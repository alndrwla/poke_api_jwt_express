const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const usersController = require('./controllers/user')
usersController.registerUser('alexander', 'password')

require('./auth')(passport)

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 3000

//const URL = 'http://localhost'

const API = '/api/v1'

app.get(API + '/', (req, res) => {
  console.log(req);
  res.status(200).send("hello world!")
})

app.post(API + '/login', (req, res) => {

  if(!req.body){
    return res.status(400).json({message: 'Missing data'})
  }else if (!req.body.user || !req.body.password){
    return res.status(400).json({message: 'Missing data'})
  }

  usersController.checkUserCredentials(req.body.user, req.body.password, (err, result)=> {
    if(!result) {
      return res.status(401).json({message: 'Invalid credentials'})
    }
    
    const token = jwt.sign({userId: req.body.user}, 'secretPassword')

    res.status(200).json(
      { token: token}
    )

  })

})

app.post(API + '/team/pokemons', (req, res) => {
  res.status(200).send("Exito")
})

app.get(API + '/team', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.status(200).send("Exito")
})

app.delete(API + '/team/pokemos/:pokeid', (req, res) => {
  res.status(200).send("Exito")
})

app.put(API + '/team', (req, res) => {
  res.status(200).send("Exito")
})


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})


module.exports = {
  app: app,
  API: API,
}