import { GeneralResponse } from '../utils/response.js';
import { GeneralError, NotFound } from '../utils/error.js';

import categoriesModel from '../models/categories.model.js';
import {config} from '../utils/config.js';
const errNotFound = 404;


const categoryList = async (req, res, next) => {
  try {
    categoriesModel.getCategories((err, response) => {
      if (err) {
        next(new NotFound('no categories found'), err);
      } else {
        next(new GeneralResponse('categories list', response));
      }
    });
  } catch (err) {
    next(new GeneralError('error while getting categories list'));
  }
};

const getCategoryByCategoryId = async (req, res, next) => {
  const { categoryid } = req.params;
  try {
    categoriesModel.getCategoryById(categoryid, (err, response) => {

      if (err == null && response.length === 0) {
        next(new GeneralError('category not found'));
      }else{
        next(new GeneralResponse('category detail found', response));
      }
    });
  } catch (err) {
    next(new GeneralError('error while getting category detail'));
  }
};

const addCategory = async (req, res, next) => {
  const { name } = req.body;
  categoriesModel.addCategory(
    { name },
    (err, response) => {
      if (err != null || response.affectedRows === 0) {
        next(new GeneralError('Adding category failed', err));
      }else{
        next(
          new GeneralResponse(
            'category successfully added',
            undefined,
            config.HTTP_CREATED
          )
        );
      }
    }
  );
};

const updateCategory = async (req, res, next) => {
  const { categoryid } = req.params;
  const { name } = req.body;

  categoriesModel.updateCategory(
    categoryid,
    { name },
    (err, response) => {
      if (typeof response !== 'undefined' && response.affectedRows === 0) {
        next(new NotFound('category not found', err, errNotFound));
      }else if (err) {
        next(new GeneralError('Updating category failed'));
      }else{
        next(
          new GeneralResponse(
            'category successfully updated',
            undefined,
            config.SUCCESS
          )
        );
      }
    }
  );
};

const removeCategoryById = async (req, res, next) => {
  const { categoryid } = req.params;

  categoriesModel.removeOneCategory(
    categoryid,
    (err, response) => {
      if (err != null && !response){
        next(new GeneralError('removing category failed'));
      }else{
        next(
          new GeneralResponse(
            'category successfully removed',
            undefined,
            config.SUCCESS
          )
        );
      }
    }
  );
};

export default { categoryList, getCategoryByCategoryId, addCategory, updateCategory, removeCategoryById };
