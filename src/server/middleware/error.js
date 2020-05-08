const winston = require('winston');

module.exports = function(err, req, res, next){
  winston.error(err.message, err);

  if (err.status == 404) {
    return res.status(404).send(err.message);
  }

  res.status(500).send('Something failed.');
}
