var CronJob = require('cron').CronJob
var elEspectadorGet = require('../../controllers/elEspectadorMine')

var dailyReportT = new CronJob({
  // --------SS mm HH DD MM WW
  cronTime: '10 30 23  *  *  *',
  onTick: elEspectadorGet,
  start: false,
  timeZone: 'America/Bogota'

})

dailyReportT.start()
