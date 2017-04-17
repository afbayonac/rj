/*
http://clasificados.eltiempo.com/judiciales/remates

pagina muestra una lista de remates por un periodo de tiempo limitado
la lista contiene un link hacia el contenido de cada edicto

tiempo promedio de un rquest es 1.45 segundos en mi pc local
*/

const request = require('request')
const cheerio = require('cheerio')
const logger = require('./logger')
const $ = cheerio.load

const rawSave = require('./rawSave')

const respBad = `:( resultados en clasificados.eltiempo.com ${new Date()} es 0`

var elTiempoMine = () => {
  var opt = {
    baseUrl: 'http://clasificados.eltiempo.com',
    method: 'GET',
    uri: '/judiciales/remates/',
    qs: {
      order: 'date_desc', // para colocar los primeros a la cabesa
      rp: 10000
    },
    gzip: true
  }

  request(opt, (err, req, body) => {
    if (err) return logger.warning(`fail request to clasificados.eltiempo.com`)
    // por para ver cuantos remates hay publicados en la pagina
    // if ( $(body)('.numero-resultados b').text() == 0) return logger.warning(respBad);
    if ($(body)('.img-responsive').length > 1) return logger.warning(respBad)
    // filtro de las fechas
    // parce => slect html l => get Array  => filter for zise => filter for date
    opt.qs.rp = $(body)('.fechapub')
      .text()
      .split(' ')
      .filter(el => el.length === 8)
      .filter(validateDate)
      .length

    if (opt.qs.rp > 0) getNodo(opt); else return logger.warning(respBad)
  })
}

var validateDate = (el) => {
  let d = new Date()
  // cambia la zona horaria
  let time = new Date(d.getTime() - 300 * 60000)
  let b = el.split('/').map(Number)
  // TODO falta probar si la validacion funciona;
  return b[0] === time.getUTCDate() &&
        b[1] === time.getUTCMonth() + 1 &&
        b[2] === time.getUTCFullYear() - 2000
}

var getNodo = (opt) => {
  request(opt, (err, req, body) => {
    if (err) return logger.warning('Unsuccessful request to a clasificados.eltiempo.com page')

    $(body)('.nodo').each((i, el) => {
      opt.uri = el.attribs.href
      request(opt, (err, req, body) => {
        if (err) return logger.warning('Unsuccessful request to a clasificados.eltiempo.com remate')
        rawSave($(body)('.descripcion.clearfix').text(),
      'http://clasificados.eltiempo.com/judiciales/remates')
      })
    })
  })
}

module.exports = elTiempoMine
