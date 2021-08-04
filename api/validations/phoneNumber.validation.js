const Joi = require('joi')

module.exports = {
    validatePhoneNumber: Joi.object({
        phoneNumber: Joi.string().required().empty().regex(/^[0-9]{10}$/).min(10).max(10).messages({
            "string.pattern.base": "phone number must contain digits and must have 10 characters without country code",
        })
    }),
}