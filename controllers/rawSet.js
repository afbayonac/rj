const remate = require('../models/remateM');


var rawSet = (raw, fuente) => {

  var rm = new remate({
    fuente : fuente
    ,raw : raw
  }).save( (err,doc) =>  { if (err) console.log(err) } );

}

module.exports = rawSet;
