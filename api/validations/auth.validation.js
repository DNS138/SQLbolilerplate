const Joi = require("joi");

module.exports = {

    login : Joi.object({
        email: Joi.string().required().empty().email().messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "string.email": `email format not valid`,
        "any.required": `email is a required field`,
        }),
        password: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(6).max(16).messages({
        "string.base": `pass should be a type of 'text'`,
        "string.empty": `pass cannot be an empty field`,
        "string.min": "pass should be of minimum 6 characters",
        "string.max": "pass should be of maximum 16 characters",
        "string.pattern.base": "pass must contains lower case, upper case and between 6 and 16 characters",
        "any.required": `pass is a required field`,
        })
    })
}