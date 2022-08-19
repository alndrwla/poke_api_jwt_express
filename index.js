const cors = require('cors')
const express = require('express')
const middlewares = require('./middlewares')
const authRouters = require('./auths/auth.router').router
const teamsRouters = require('./teams/teams.router').router


const app = express()
app.use(cors())

const PORT = 3000
const API = '/api/v1'

middlewares.setupMiddlewares(app)

app.get(API + '/', (req, res) => {
  res.status(200).send("hello world!")
})

app.use(API + '/auth', authRouters)
app.use(API + '/teams', teamsRouters)


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})


module.exports = {
  app: app,
  API: API,
}
