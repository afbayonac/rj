/*
http://2kstudio.com/judiciales/detalle.php?idenv=2016040316400827

pagina que permite hacer busquedas de remates, paginado listas  el resulado

*/

const request = require('request');
const cheerio = require('cheerio');
const logger = require('./logger');
const $ = cheerio.load

const rawSave  = require('./rawSave');

const respBad = `el numero de resultados en 2kstudio.com ${new Date()} es 0`

var parceDate =
  d => `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;
// determina el numero de paginas que se deben buscar
var numberPages = (n) =>  (n%5 === 0) ? n/5 : (n - n%5)/5 + 1 ;

var opt = {
  baseUrl : "http://2kstudio.com/"
  ,uri : '/judiciales/index.php'
  ,method : 'POST'
  ,qs:{}
  ,formData : {
    validez_init : parceDate(new Date)
    ,validez_fin : parceDate(new Date)
    ,categoria : 'Remates'
    ,palabras : ''
  }
  ,gzip : true
  ,jar : true // para que guarde cookies
}

var elEspectadorMine = () => {

  request(opt, (err, req, body) => {
    if (err) return logger.warning('fail request to 2kstudio.com');
    //opt req.headers['set-cookie'][0].split('; ')[0]
    // se le suma + 1 porque la pagiancion comienza desde 1
    if( !$(body)('.criterio').length ) return logger.warning(respBad);
    Array.from(
        { length : numberPages( $(body)('.criterio').first().text() ) }
        ,(v, k) => k + 1)
      .map(iteratePages);
  });
}


var iteratePages = (page) => {
  opt.qs.page = page ;
  request(opt, (err, req, body) => {
    if (err) return logger.warning('Unsuccessful request to a 2kstudio.com page');
    $(body)('#boton_mas').children().each((i, el) => {
       getNodo(el.attribs.onclick.split('\'')[1]);
    })
  });
}

var getNodo = (idenv) => {
  var opt =
  request(
    {
    baseUrl : "http://2kstudio.com/"
    ,uri : '/judiciales/detalle.php'
    ,qs : { idenv :idenv  }
    ,method : 'GET'
    ,gzip : true
    }
    ,(err, req, body) => {
    if (err) return logger.warning('Unsuccessful request to a 2kstudio.com remate');
    rawSave( $(body)('#detalle_resultado').children().text()
      ,'http://2kstudio.com/judiciales/index.php');
  });
}

module.exports = elEspectadorMine;
