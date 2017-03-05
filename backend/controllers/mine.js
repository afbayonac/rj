var elEspectadorMine = require('./elEspectadorMine.js')
var elTiempoMine = require('./elTiempoMine.js')


mine = (dateInit) => {
  elEspectadorMine(dateInit);
  elTiempoMine();
}

module.exports = mine;
