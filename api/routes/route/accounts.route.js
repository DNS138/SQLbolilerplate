const express = require("express");
const router = express.Router();
const { validator } = require("../../helpers/validator.helper");
const { authenticate } = require('../../helpers/auth.helper');
const accountsController = require("../../controllers/accounts.controller");

const phoneNumberValidation = require('../../validations/phoneNumber.validation')


router.put("/reset", authenticate, accountsController.resetPassword);
router.post("/forget/email", accountsController.sendOTP);
router.post("/forget/verify", accountsController.verifyOTP);
router.post("/forget/set", accountsController.setNewPassword);
router.post("/forget/SMS", validator.body(phoneNumberValidation.validatePhoneNumber), accountsController.sendSMS);

module.exports = router;