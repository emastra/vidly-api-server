const winston = require('winston');
// require('winston-mongodb');
const expressWinston = require('express-winston');
// async errors handling wrap
require('express-async-errors');

module.exports = function(app) {
  // log to console express requests if not in production
  if (process.env.NODE_ENV !== 'production') {
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.timestamp({format: 'DD-MM-YY HH:mm:ss'}),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      meta: true,
      expressFormat: true,
      colorize: true
    }));
  }

  // log unhandled exceptions
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    // then it will automatically close the process // bad practive otherwise risk unclean state of the app
  );
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // default logging

  winston.add(new winston.transports.File({
    filename: 'logfile.log',
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({format: 'DD-MM-YY HH:mm:ss'}),
      winston.format.align(),
      winston.format.printf(info => `${info.timestamp} ${info.level}:${info.message}`),
    )
  }));

  if (process.env.NODE_ENV == 'production') {
    // winston.add(winston.transports.MongoDB, {
    //   db: 'mongodb://localhost/vidly',
    //   level: 'info'
    // });
  } else {
    winston.add(new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({format: 'DD-MM-YY HH:mm:ss'}),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}:${info.message}`),
      )
    }));
  }
}
