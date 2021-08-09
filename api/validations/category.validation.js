const Joi = require('joi');

const minLen = 2;
const maxLen = 128;

module.exports = {
    validateCategory: Joi.object({
        name: Joi.string().required().empty().min(minLen).max(maxLen).messages({
          'string.base': `first name should be a type of 'text'`,
          'string.empty': `first name cannot be an empty field`,
          'any.required': `first name is a required field`
        })
    })

};
