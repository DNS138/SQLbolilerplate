function generateOTP() {

    var OTP = Math.random();
    OTP = OTP * 1000000;
    OTP = parseInt(OTP);
  
    return OTP;
}

module.exports.generateOTP = generateOTP;

