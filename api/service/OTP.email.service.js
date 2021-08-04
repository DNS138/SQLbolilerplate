var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  }
});

function sendEmail(email, OTP, callback) {
  var mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'Sending verification code',
    text: OTP
  };

  transporter.sendMail(mailOptions, function (error, data) {

    if (error) {
      callback(1)
    } else {
      callback(null, 1)
    }
  });
}

module.exports.sendEmail = sendEmail;


