
/*
http://clasificados.eltiempo.com/judiciales/remates

pagina muestra una lista de remates por un periodo de tiempo limitado
lalista contiene un link hacia el contenido de cada edicto

tiempo promedio de un rquest es 1.45 segundos en mi pc local
*/
const request = require('request');
const async   = require('async');
const cheerio = require('cheerio');
const $ = cheerio.load

const rawSet  = require('./rawSet.js');

const respBad = "el numero de resultados en clasificados.eltiempo.com "
  +  new Date() + " es 0"

var elTiempoGet = function () {

  var opt = {
    baseUrl : "http://clasificados.eltiempo.com"
    ,method : 'GET'
    ,uri : '/judiciales/remates/'
    ,qs : {
      order : "date_desc" // para colocar los primeros a la cabesa
      ,rp : 10000
    }
    ,gzip : true
  };

  request(opt, (e, req, body) => {
    if (e) return console.log(e);
    // por para ver cuantos remates hay publicados en la pagina
    // if ( $(body)('.numero-resultados b').text() == 0) return console.log(respBad);
    if ( $(body)('.img-responsive').length > 1 ) return console.log(respBad);
    // filtro de las fechas
    // parce => slect html l => get Array  => filter for zise => filter for date
    opt.qs.rp =  $(body)('.fechapub')
          .text()
          .split(' ')
          .filter( el => el.length === 8 )
          .filter( validateDate )
          .length ;

    if( opt.qs.rp > 0 ) getNodo(opt); else return console.log(respBad);
  });
}

var validateDate = (el) => {
  a = new Date();
  b = el.split('/').map(Number);
  // falta probar si la validacion funciona
  return  b[0] === a.getUTCDate() &&
          b[1] === a.getUTCMonth() + 1 &&
          b[2] === a.getUTCFullYear() - 2000 ;
}


var getNodo = (opt) => {
  request(opt, (e, req, body) => {
    if (e) return console.log(e);

    $(body)('.nodo').each((i, el) => {
      opt.uri = el.attribs.href;
      request(opt, (e, req, body) =>
      {
      if (e) return console.log(e);
      //log( $(body)('.descripcion.clearfix').text() );
        rawSet($(body)('.descripcion.clearfix').text(),
          'http://clasificados.eltiempo.com/judiciales/remates')
      });
    });
  });
}

module.exports = elTiempoGet;
