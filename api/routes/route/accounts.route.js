const express = require('express');
const router = express.Router();
const { validator } = require('../../helpers/validator.helper');
const { authenticate } = require('../../helpers/auth.helper');
const accountValidation = require('../../validations/account.validation');
const accountsController = require('../../controllers/accounts.controller');

router.put('/reset', [ authenticate, validator.body(accountValidation.validatePassword) ], accountsController.resetPassword);
router.post('/forget/email', validator.body(accountValidation.validateEmail), accountsController.sendOTP);
router.post('/forget/verify', validator.body(accountValidation.validateOTP), accountsController.verifyOTP);
router.post('/forget/set', validator.body(accountValidation.validateForgetApi), accountsController.setNewPassword);
router.post('/forget/SMS', validator.body(accountValidation.validatePhoneNumber), accountsController.sendSMS);

module.exports = router;
