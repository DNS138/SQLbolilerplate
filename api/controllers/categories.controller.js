const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");

const categoryModel = require("../models/categories.model");
const config = require("../utils/config");


exports.categoryList = async (req, res, next) => {
  try {
    categoryModel.getCategories((err, response) => {
      if (err) next(new NotFound('no categories found'));
      else next(new GeneralResponse('categories list', response))
    })
  } catch (err) {
    next(new GeneralError('error while getting categories list'))
  }
  }

exports.getCategoryByCategoryId = async (req, res, next) => {
  let { categoryid } = req.params;
  try {
    categoryModel.getCategoryById(categoryid, (err, response) => {

      if (err == null && response.length == 0) {
        next(new GeneralError('category not found'));
      }
      else next(new GeneralResponse('category detail found', response))
    })
  } catch (err) {
    next(new GeneralError('error while getting category detail'))
  }
}

exports.addCategory = async (req, res, next) => {
  let { name } = req.body;
  categoryModel.addCategory(
    { name },
    (err, response) => {
      if (err != null || response.affectedRows == 0) {
        
        next(new GeneralError("Adding category failed", err));
      }

      else
        next(
          new GeneralResponse(
            "category successfully added",
            undefined,
            config.HTTP_CREATED
          )
        );
    }
  );
};

exports.updateCategory = async (req, res, next) => {
  let { categoryid } = req.params;
  let { name } = req.body;

  categoryModel.updateCategory(
    categoryid,
    { name },
    (err, response) => {
      if (typeof response !== 'undefined' && response.affectedRows == 0) {
        next(new NotFound('category not found', err, 404))
      }
      else if (err) {
        next(new GeneralError("Updating category failed"));
      }

      else
        next(
          new GeneralResponse(
            "category successfully updated",
            undefined,
            config.SUCCESS
          )
        );
    }
  );
};

exports.removeCategoryById = async (req, res, next) => {
  let {categoryid} = req.params;

  categoryModel.removeOneCategory(
    categoryid,
    (err, response) => {
      if (err != null)
        next(new GeneralError("removing category failed"));
      else
        next(
          new GeneralResponse(
            "category successfully removed",
            undefined,
            config.SUCCESS
          )
        );
    }
  );
};

