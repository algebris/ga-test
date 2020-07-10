const { createLogger, format, transports } = require('winston');

const { combine } = format;

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow',
  },
};

const logger = createLogger({
  levels: config.levels,
  format: combine(
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
