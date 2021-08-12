import express from 'express';
const router = express.Router();
import { validator } from '../../helpers/validator.helper.js';
import { authenticate } from '../../helpers/auth.helper.js';
import accountValidation from '../../validations/account.validation.js';
import accountsController from '../../controllers/accounts.controller.js';

router.put('/reset', [ authenticate, validator.body(accountValidation.validatePassword) ], accountsController.resetPassword);
router.post('/forget/email', validator.body(accountValidation.validateEmail), accountsController.sendOTP);
router.post('/forget/verify', validator.body(accountValidation.validateOTP), accountsController.verifyOTP);
router.post('/forget/set', validator.body(accountValidation.validateForgetApi), accountsController.setNewPassword);
router.post('/forget/SMS', validator.body(accountValidation.validatePhoneNumber), accountsController.sendSMS);

export const accountRoute = router;
