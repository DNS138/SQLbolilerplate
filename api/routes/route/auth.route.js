import express from 'express';
const router = express.Router();
import { validator } from '../../helpers/validator.helper.js';
import authController from '../../controllers/auth.controller.js';
import authValidation from '../../validations/auth.validation.js';

router.post('/login', validator.body(authValidation.login), authController.login);

export const authRoute = router;
