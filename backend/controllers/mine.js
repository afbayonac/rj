var elEspectadorMine = require('./elEspectadorMine.js')
var elTiempoMine = require('./elTiempoMine.js')

var mine = (dateInit) => {
  elEspectadorMine(dateInit)
  elTiempoMine()
}

module.exports = mine
