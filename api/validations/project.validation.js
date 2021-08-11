import Joi from 'joi';

export const projectValidation = {
    validateProject: Joi.object({
        title: Joi.string().required().empty().messages({
          'string.base': `first name should be a type of 'text'`,
          'string.empty': `first name cannot be an empty field`,
          'any.required': `first name is a required field`}
        ),
        description: Joi.string().required().empty().messages({
            'string.base': `first name should be a type of 'text'`,
            'string.empty': `first name cannot be an empty field`,
            'any.required': `first name is a required field`}
        ),
        categoryId: Joi.number().required().empty().messages({
            'any.required': `categoryId is a required field`}
        ),
        image: Joi.string().messages({
            'string.base': `image name should be a type of 'text'`}
        )}
      )};

