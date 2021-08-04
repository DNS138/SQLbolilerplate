const express = require("express");
const router = express.Router();
const {validator} = require("../../helpers/validator.helper");
const authController = require("../../controllers/auth.controller");
const authValidation = require("../../validations/auth.validation");

// /**
//  * @param  {Route} "/user/"
//  * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
//  */

router.post("/login", validator.body(authValidation.login), authController.login);

module.exports = router;
