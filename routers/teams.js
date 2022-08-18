const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../auth')(passport)

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send("Exito")
  })
  .put((req, res) => {
    res.status(200).send("Exito")
  })

router.route('/pokemons')
  .post((req, res) => {
    res.status(200).send("Exito")
  })

router.route('/pokemons/:pokeid')
  .delete((req, res) => {
    res.status(200).send("Exito")
  })

exports.router = router