const maxOtp = 1000000;
const genOtp = () => {

    let OTP = Math.random();
    OTP = OTP * maxOtp;
    OTP = parseInt(OTP, 10);
    return OTP;
};

export const generateOTP = genOtp;


