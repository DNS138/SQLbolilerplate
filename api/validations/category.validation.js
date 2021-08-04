const Joi = require('joi')

module.exports = {
    validateCategory: Joi.object({
        name: Joi.string().required().empty().min(2).max(128).messages({
          "string.base": `first name should be a type of 'text'`,
          "string.empty": `first name cannot be an empty field`,
          "any.required": `first name is a required field`,
        }),
    }),

}