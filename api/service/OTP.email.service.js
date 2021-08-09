const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  }
});

const sendMail = function sendEmail(email, OTP, callback) {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'Sending verification code',
    text: OTP
  };

  transporter.sendMail(mailOptions, function (error, data) {

    if (error) {
      callback(data);
    } else {
      callback(null, data);
    }
  });
};


module.exports.sendEmail = sendMail;


