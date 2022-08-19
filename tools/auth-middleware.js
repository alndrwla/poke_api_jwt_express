const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const API = '/api/v1'


const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: 'secretPassword' // TODO: environment virtual
  }
  passport.use(new JwtStrategy(opts, (decoded, done) => {
    console.log('decoded jwt:', decoded)
    return done(null, decoded)
  }))
}

const protectWithJwt = (req, res, next) => {
  if (req.path == API +'/' || req.path == API +'/auth/login' ) {
      return next()
    }    

    return passport.authenticate('jwt', { session: false})(req, res, next)
}

exports.init = init
exports.protectWithJwt = protectWithJwt