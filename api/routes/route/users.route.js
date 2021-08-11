import express from 'express';
const router = express.Router();
import { validator } from '../../helpers/validator.helper.js';
import { usersController } from '../../controllers/users.controller.js';
import { userValidation } from '../../validations/user.validation.js';

router.get('/',usersController.userList);
router.get('/:userid',usersController.getUserByUserId);
router.post('/',validator.body(userValidation.register),usersController.register);

export const userRoute = router;
