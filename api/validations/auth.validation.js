const Joi = require('joi');

const minLen = 6;
const maxLen = 16;

module.exports = {

    login : Joi.object({
        email: Joi.string().required().empty().email().messages({
    'string.base': `email should be a type of 'text'`,
        'string.empty': `email cannot be an empty field`,
        'string.email': `email format not valid`,
        'any.required': `email is a required field`
        }),
        password: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(minLen).max(maxLen).messages({
        'string.base': `password should be a type of 'text'`,
        'string.empty': `password cannot be an empty field`,
        'string.min': 'password should be of minimum 6 characters',
        'string.max': 'password should be of maximum 16 characters',
        'string.pattern.base': 'password must contains lower case, upper case and between 6 and 16 characters',
        'any.required': `password is a required field`
        })
    })
};
