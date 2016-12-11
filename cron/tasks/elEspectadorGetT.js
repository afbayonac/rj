var CronJob = require('cron').CronJob;
var elEspectadorGet = require('../../controllers/elEspectadorGet.js')

var dailyReportT = new CronJob({
  //----------SS mm HH DD MM WW
  //cronTime : '10 00 03  *  *  *'
  cronTime : '10  *  *  *  *  *'
  ,onTick : elEspectadorGet
  ,start : false
  ,timeZone : 'America/Bogota'

});

dailyReportT.start()
