const jwt = require('jsonwebtoken')
const usersController = require('./user.controller')
const {to} = require('../tools/to')

const loginUser = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing data' })
    } else if (!req.body.user || !req.body.password) {
      return res.status(400).json({ message: 'Missing data' })
    }

  let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password))

  if (err || !resp) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  let user = await usersController.getUserIdFromUserName(req.body.user)
  const token = jwt.sign({ userId: user.userId }, 'secretPassword')
  res.status(200).json(
    { token: token }
  )
}

exports.loginUser = loginUser 