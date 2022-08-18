const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const PORT = 3000

//const URL = 'http://localhost'

const API = '/api/v1'

app.get(API + '/', (req, res) => {
  console.log(req);
  res.status(200).send("hello world!")
})

app.post(API + '/team/pokemons', (req, res) => {
  res.status(200).send("Exito")
})

app.get(API + '/team', (req, res) => {
  res.status(401).send("Exito")
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