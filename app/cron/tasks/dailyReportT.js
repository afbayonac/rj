var CronJob = require('cron').CronJob
var dailyReport = require('../../controllers/dailyReport.js')

var dailyReportT = new CronJob({
  // --------SS mm HH DD MM WW
  cronTime: '00 30 08 * * *',
  onTick: dailyReport,
  start: false,
  timeZone: 'America/Bogota'
})

dailyReportT.start()
// module.exports = dailyReportT;
