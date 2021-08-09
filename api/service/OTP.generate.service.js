const maxOtp = 1000000;
const genOtp = function generateOTP() {

    let OTP = Math.random();
    OTP = OTP * maxOtp;
    OTP = parseInt(OTP, 10);
    return OTP;
};

module.exports.generateOTP = genOtp;


