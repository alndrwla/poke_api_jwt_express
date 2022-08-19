const express = require('express')
const router = express.Router()
const authHttpHandlers = require('./auth.http')

router.route('/login')
.post(authHttpHandlers.loginUser)

exports.router = router 