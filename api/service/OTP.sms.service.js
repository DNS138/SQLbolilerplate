
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

let result = 0;

const sendSms = (number, OTP, callback) => {
    client.messages
        .create({
            body: OTP,
            from: myNumber,
            to: '+91' + number}
        )
        .then(message => {
            result = message.sid;
            if (!result) {
                callback(1);
            } else {
                callback(null, 1);
            }
        });
};

export const sendSmS = sendSms;
