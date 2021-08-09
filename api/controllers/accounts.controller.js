const bcrypt = require('bcrypt');
const saltRounds = 10;

const { GeneralResponse } = require('../utils/response');
const { GeneralError, UnAuthorized } = require('../utils/error');

const accountsModel = require('../models/accounts.model');
const config = require('../utils/config');
const { getPassword } = require('../helpers/getPassword.helper');
const { isValidEmail } = require('../helpers/isValidEmail.helper');

const { sendSMS } = require('../service/OTP.sms.service');
const { sendEmail } = require('../service/OTP.email.service');
const { generateOTP } = require('../service/OTP.generate.service');

exports.resetPassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { userid } = req.decoded;

    const password = getPassword(userid);

    if (bcrypt.compare(currentPassword, password) && newPassword === confirmPassword) {
        const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);

        try {
            accountsModel.resetPassword(
                encryptedPassword,
                userid,
                (err, response) => {
                    if (err) {
                        next(new GeneralError('Resetting password failed'));
                    }else if (response && response.affectedRows > 0){
                        next(
                            new GeneralResponse(
                                'New password is set successfully',
                                undefined,
                                config.SUCCESS
                            )
                        );
                    }else {
                        next(new GeneralError('Setting new password failed'));
                    }
                });
        } catch (err) {
            next(new GeneralError('error while setting new password'));
        }
    }else {
        next(new UnAuthorized('Enter password correctly'));
    }

};


let OTP;

exports.sendOTP = async (req, res, next) => {
    const email = req.body.email;
    OTP = generateOTP();

    const valid = isValidEmail(email);

    if (valid) {
        sendEmail(
            email,
            OTP,
            (err, response) => {
                if (err && !response) {
                    next(new GeneralError('Sending email failed'));
                }else{
                    next(
                        new GeneralResponse(
                            'Verification Email successfully sent',
                            undefined,
                            config.SUCCESS
                        )
                    );
                }
            }
        );
    }else {
        next(new UnAuthorized('enter registered email'));
    }
};


exports.verifyOTP = (req, res, next) => {
    const enteredOTP = req.body.OTP;

    accountsModel.verifyOTP(enteredOTP, OTP, (err, response) => {
        if (err && !response) {
            next(new GeneralError('OTP is invalid'));
        }else{
            next(
                new GeneralResponse(
                    'Your account is verified. Set new password',
                    undefined,
                    config.SUCCESS
                )
            );
        }
    });
};

exports.setNewPassword = async (req, res, next) => {

    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword === confirmPassword) {
        const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);

        try {
            accountsModel.setNewPassword(
                encryptedPassword,
                email,
                (err, response) => {
                    if (err) {
                        next(new GeneralError('Setting new password failed'));
                    }else if (response && response.affectedRows > 0){
                        next(
                            new GeneralResponse(
                                'Password resetting successful',
                                undefined,
                                config.SUCCESS
                            )
                        );
                    }else {
                        next(new GeneralError('Resetting password failed'));
                    }
                });
        } catch (err) {
            next(new GeneralError('error while resetting password'));
        }
    }else {
        next(new UnAuthorized('enter correct details'));
    }
};

exports.sendSMS = async (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    OTP = generateOTP();

        sendSMS(
            phoneNumber,
            OTP,
            (err, response) => {
                if (err && !response) {
                    next(new GeneralError('Sending SMS failed'));
                }else{
                    next(
                        new GeneralResponse(
                            'Verification SMS successfully sent',
                            undefined,
                            config.SUCCESS
                        )
                    );
                }
            }
        );
};


