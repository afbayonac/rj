const nodemailer = require('nodemailer');
const rjcfg = require('../rjcfg.json');

var dailyReport = () => {
  var transporter = nodemailer.createTransport( rjcfg.emailservice );


  // transporter.verify(function(error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Server is ready to take our messages');
  //   }
  // });

  var mailOptions = {
    subject : 'RJ ' + new Date().toDateString()
    ,from : '<afbayonac@gmail.com>'
    ,to : 'afbayonac@gmail.com'
    ,text : 'hello this is RJ'
    ,html : '<h1> Hello this is RJ </h1>'
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
     console.log('Message sent');
  });
}

module.exports = dailyReport;
