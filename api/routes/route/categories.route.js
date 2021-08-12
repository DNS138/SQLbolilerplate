import express from 'express';
const router = express.Router();
import { validator } from '../../helpers/validator.helper.js';
import { authenticate } from '../../helpers/auth.helper.js';
import categoriesController from '../../controllers/categories.controller.js';

import categoryValidation from '../../validations/category.validation.js';

const pathString = 'categoryid';

router.get('/', categoriesController.categoryList);
router.get(`/:${pathString}`, categoriesController.getCategoryByCategoryId);
router.post('/', [validator.body(categoryValidation.validateCategory)], categoriesController.addCategory);
router.put(`/:${pathString}`, [authenticate, validator.body(categoryValidation.validateCategory)], categoriesController.updateCategory);
router.delete(`/:${pathString}`, authenticate, categoriesController.removeCategoryById);

export const categoryRoute = router;


