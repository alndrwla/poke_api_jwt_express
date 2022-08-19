const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')

const authRouters = require('./auths/auth.router').router
const teamsRouters = require('./teams/teams.router').router

require('./tools/auth')(passport)

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 3000
const API = '/api/v1'

app.use(API + '/auth', authRouters)
app.use(API + '/teams', teamsRouters)

app.get(API + '/', (req, res) => {
  res.status(200).send("hello world!")
})

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})


module.exports = {
  app: app,
  API: API,
}