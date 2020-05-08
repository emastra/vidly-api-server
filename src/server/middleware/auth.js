const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // decoded is an object with _id and isAdmin props. Included when token is generated/signed
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch (ex) {
    // jwt.verify throws an error if cannot verify. and eventually i catch it here.
    res.status(400).send('Invalid token.');
  }
}
