const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../auth')(passport)

const teamsController = require('../controllers/teams')
const { getUser } = require('../controllers/user')

router.route('/')
  .get(passport.authenticate('jwt', { session: false }),
    (req, res) => {
      let user = getUser(req.user.userId)
      res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
      })
  })
  .put(passport.authenticate('jwt', { session: false }),
    (req, res) => {
    teamsController.setteam(req.user.userId, req.body.team)
    res.status(200).send()
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