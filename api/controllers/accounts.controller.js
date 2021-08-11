import bcrypt from 'bcrypt';
const saltRounds = 10;

import { GeneralResponse } from '../utils/response.js';
import { GeneralError, UnAuthorized } from '../utils/error.js';

import { accountsModel } from '../models/accounts.model.js';
import { config } from '../utils/config.js';
import { getPassword } from '../helpers/getPassword.helper.js';
import { isValidMail } from '../helpers/isValidEmail.helper.js';

import { sendSmS } from '../service/OTP.sms.service.js';
import { sendEmail } from '../service/OTP.email.service.js';
import { generateOTP } from '../service/OTP.generate.service.js';

const resetPassword = async (req, res, next) => {
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

const sendOTP = async (req, res, next) => {
    const email = req.body.email;
    OTP = generateOTP();

    const valid = isValidMail(email);

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


const verifyOTP = (req, res, next) => {
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

const setNewPassword = async (req, res, next) => {

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

const sendSMS = async (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    OTP = generateOTP();

        sendSmS(
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

export const accountsController = { resetPassword, sendOTP, verifyOTP, setNewPassword, sendSMS };

