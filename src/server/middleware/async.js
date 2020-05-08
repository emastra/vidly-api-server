// this middleware can be used as an alternative to express-async-errors wrapper
// this mw is not used.
// check mosh

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      next(ex);
    }
  };
}
