const express = require('express');
const router = express.Router();
const { validator } = require('../../helpers/validator.helper');
const { authenticate } = require('../../helpers/auth.helper');
const categoriesController = require('../../controllers/categories.controller');

const categoryValidation = require('../../validations/category.validation');

const pathString = 'categoryid';

router.get('/', categoriesController.categoryList);
router.get(`/:${pathString}`, categoriesController.getCategoryByCategoryId);
router.post('/', [authenticate, validator.body(categoryValidation.validateCategory)], categoriesController.addCategory);
router.put(`/:${pathString}`, [authenticate, validator.body(categoryValidation.validateCategory)], categoriesController.updateCategory);
router.delete(`/:${pathString}`, authenticate, categoriesController.removeCategoryById);
module.exports = router;


