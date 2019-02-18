const config = require('config');
const express = require('express');
const path = require('path');

module.exports = function(app) {
  if (!config.get('jwtPrivateKey')) {
    // throw error, will be catched by error middleware (and terminate the process -check winston)
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));
  // app.use(express.static(path.join(__dirname, '../public')));
}
