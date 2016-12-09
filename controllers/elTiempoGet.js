
/*
http://clasificados.eltiempo.com/judiciales/remates

pagina muestra una lista de remates por un periodo de tiempo limitado
lalista contiene un link hacia el contenido de cada edicto

tiempo promedio de un rquest es 1.45 segundos en mi pc local
*/

const request = require('request');
const cheerio = require('cheerio');
const async   = require('async');
const $ = cheerio.load

// temporal mientras de implementa un log
const log = console.log


var opt = {
  baseUrl : "http://clasificados.eltiempo.com"
  ,method : 'GET'
  ,uri : '/judiciales/remates/'
  ,qs : {
    order : "date_desc" // para colocar los primeros a la cabesa
    //,rp :
  }
  ,gzip : true
};

const respBad = "el numero de resultados en clasificados.eltiempo.com "
  +  new Date() + " es 0"


var elTiempoGet = function () {
  request(opt, (e, req, body) => {
    // por para ver cuantos remates hay publicados en la pagina
    // if ( $(body)('.numero-resultados b').text() == 0) return console.log(respBad);
    if ( $(body)('.img-responsive').length > 1 ) return log(respBad);
    // filtro de las fechas
    // parce => slect html l => get Array  => filter for zise => filter for date
    opt.rp =  $(body)('.fechapub')
          .text()
          .split(' ')
          .filter( el => el.length === 8 ).filter( validateDate )
          .length ;

    if( opt.rp > 0 ) getNodo();
  });
}

var validateDate = (el) => {
  a = new Date();
  // falta probar si la validacion funciona
  return  true ;
  el.split('/') ===
  [a.getUTCFullYear(), a.getUTCDate(), a.getUTCMonth() + 1];
}


var getNodo = () => {
  request(opt, (e, req, body) => {

    if (e) return console.log(e);

    $(body)('.nodo').each((i, el) => {
      opt.uri = el.attribs.href;
      request(opt, (e, req, body) =>
      {
        log( $(body)('.descripcion.clearfix').text() );
      });
    });
  });
}
