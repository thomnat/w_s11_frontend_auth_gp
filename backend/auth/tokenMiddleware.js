const jwt = require('jsonwebtoken')

const thisShouldBeSecret = 'shh'

module.exports = function protect(req, res, next) {
  const token = req.headers.authorization
  if (!token) return next({ status: 401, message: 'Token Required!' })
  jwt.verify(token, thisShouldBeSecret, (err, decoded) => {
    if (err) return next({ status: 401, message: 'Token invalid' })
    req.decodedJwt = decoded
    next()
  })
}
