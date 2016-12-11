/*

  juzgado -> municipio -> departamento // dificil direcion
  proceso -> numero de radicion // en el edito

Artículo  55. El artículo 525 del Código de Procedimiento Civil, quedará así:
"Artículo, 525. Aviso y publicaciones. El remate se anunciará al público por,
 aviso que expresará:

1. La fecha y hora en que ha de principiar la licitación.
2. Los bienes materia del remate con indicación de su clase, especie
y cantidad, si son muebles; si son inmuebles la matrícula de su registro
si existiere, el lugar de ubicación, nomenclatura o nombre y a falta del
último requisito, sus linderos.
3. El avalúo correspondiente a cada bien o grupo de bienes y la base de la litación.
4. El porcentaje que deba consignarse para hacer postura.

El aviso se publicará por una vez, con antelación no inferior a diez días
a la fecha señalada para el remate, en uno de los periódicos de más amplia
circulación en el lugar y en una radiodifusora local si la hubiere; una copia
informal de la página del diario y la constancia del administrador o funcionario
de la emisora sobre su transmisión se agregarán al expediente antes de darse
inicio a la subasta. Con la copia o la constancia de la publicación del aviso,
deberá allegarse un certificado de tradición y libertad del inmueble
actualizado, expedido dentro de los cinco (5) días anteriores a la fecha
prevista para la diligencia de remate.

Cuando existieren bienes situados fuera del territorio del circuito a que
corresponda el juzgado donde se adelanta el proceso, y en el lugar donde estén
ubicados no circule un medio de comunicación impreso, ni exista una
radiodifusora local, la publicación se hará por cualquier otro medio,
 a juicio del juez.

En ningún caso podrá prescindirse de las publicaciones exigidas en este artículo."


*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Remate = new Schema({
  remate :[{
    item : String
    ,location : String
    ,base : Number
  }]
  ,demandante : [{
    name : String
    ,cc : String
  }]
  ,demandante : [{
    name : String
    ,cc : String
  }]
  ,juzgado : String
  ,proceso : String
  ,fechaLicitacion : Date
  ,dateCreated : { type: Date, default: Date.now }
  ,fuente : String
  ,raw : String
});

module.exports = mongoose.model('remate', Remate);
