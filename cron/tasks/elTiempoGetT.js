var CronJob = require('cron').CronJob;
var elTiempoGet = require('../../controllers/elTiempoGet.js')

var dailyReportT = new CronJob({
  //----------SS mm HH DD MM WW
  cronTime : '00 00 03  *  *  *'
  ,onTick : elTiempoGet
  ,start : false
  ,timeZone : 'America/Bogota'

});

dailyReportT.start()
