// to be used for routes that requires admin access

module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
}
