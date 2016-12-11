const remate = require('../models/remateM');


var rawSet = (raw, fuente) => {
  
  var rm = new remate({
    fuente : fuente
    ,raw : raw
  }).save( (err,doc) =>
  {
    console.log('err : ',err,'doc : ',doc);
  }
 );
}

module.exports = rawSet;
