// logqer for remtes judiciales

const winston = require('winston');

logger = new winston.Logger({
  transports: [
  new (winston.transports.Console)(),
  new (winston.transports.File)({
    filename: 'logs/.log'
    ,maxsize: 5120
    ,maxFiles:  5
    ,json: false
  })
]})

module.exports = logger;
module.exports.stream = {
    write: (message, encoding) =>  logger.info(message.slice(0, -1))
};
