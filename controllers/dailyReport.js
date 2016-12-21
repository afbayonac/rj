const nodemailer = require('nodemailer');
const rjcfg = require('../rjcfg.json');
const logger = require('./logger');

var dailyReport = () => {
  var transporter = nodemailer.createTransport( rjcfg.emailservice );

  var mailOptions = {
    subject : 'RJ ' + new Date().toDateString()
    ,from : '<afbayonac@gmail.com>'
    ,to : 'afbayonac@gmail.com'
    ,text : 'RJ'
    ,html : '<h1> RJ </h1>'
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) return logger.warn(err)
    logger.info('Message sent');
  });
}

module.exports = dailyReport;
