import Joi from 'joi';

export default {
    validateProject: Joi.object({
        title: Joi.string().required().empty().messages({
          'string.base': `title should be a type of 'text'`,
          'string.empty': `title cannot be an empty field`,
          'any.required': `title is a required field`}
        ),
        description: Joi.string().required().empty().messages({
            'string.base': `description should be a type of 'text'`,
            'string.empty': `description cannot be an empty field`,
            'any.required': `description is a required field`}
        ),
        categoryId: Joi.number().required().empty().messages({
            'any.required': `categoryId is a required field`}
        ),
        image: Joi.string().messages({
            'string.base': `image name should be a type of 'text'`}
        )}
      )};

