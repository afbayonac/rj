const remate = require('../models/remateM');
const logger = require('./logger');
var crypto = require('crypto');

var rawSet = (raw, fuente) => {

  var rm = new remate({
    fuente : fuente
    ,raw : raw
    ,rawid : crypto.createHash('sha256').update(raw).digest("hex")
  }).save( (err ) =>  {
    if (err) return logger.warning(`in save raw ${ err.code }`);
    logger.info(`save ${raw.slice(10,30)}... of ${fuente} `);
  });

}

module.exports = rawSet;
