module.exports = function(req, res, next) {
  const err = new Error('404 Not Found');
  err.status = 404;
  
  throw err;
}
