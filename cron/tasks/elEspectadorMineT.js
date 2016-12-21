var CronJob = require('cron').CronJob;
var elEspectadorGet = require('../../controllers/elEspectadorMine')

var dailyReportT = new CronJob({
  //----------SS mm HH DD MM WW
  cronTime : '10  00  03  *  *  *'
  ,onTick : elEspectadorGet
  ,start : false
  ,timeZone : 'America/Bogota'

});

dailyReportT.start()
