const express = require("express");
const router = express.Router();
const {validator} = require("../../helpers/validator.helper");
const usersController = require("../../controllers/users.controller");
const { authenticate } = require('../../helpers/auth.helper');
const userValidation = require('../../validations/user.validation')

router.get("/",usersController.userList);
router.get("/:userid",usersController.getUserByUserId);
router.post("/",validator.body(userValidation.register),usersController.register);

module.exports = router;
