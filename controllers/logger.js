// logqer for remtes judiciales
const winston = require('winston');

var myCustomLevels = {
  levels:{
    emerg: 0
    ,alert: 1
    ,crit: 2
    ,error: 3
    ,warning: 4
    ,notice: 5
    ,info: 6
    ,debug: 7
  },
  colors: {
    emerg: "black"
    ,alert: "black"
    ,crit: "black"
    ,error: "red"
    ,warning: "yellow"
    ,notice: "white"
    ,info: "green"
    ,debug: "cyan"
  }
};

logger = new winston.Logger({
  levels: myCustomLevels.levels
  ,transports: [
  new (winston.transports.Console)({
    colorize: true
  }),
  new (winston.transports.File)({
    filename: 'logs/.log'
    ,maxsize: 5120
    ,maxFiles:  5
    ,json: false
  })
]})

winston.addColors(myCustomLevels.colors);

module.exports = logger;
module.exports.stream = {
    write: (message, encoding) =>  logger.info(message.slice(0, -1))
};

// logger.emerg('hello')
// logger.alert('hello')
// logger.crit('hello')
// logger.error('hello')
// logger.warning('hello')
// logger.notice('hello')
// logger.info('hello')
// logger.debug('hello')
