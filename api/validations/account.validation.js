const Joi = require("joi");

module.exports = {

    validatePassword: Joi.object({
        currentPassword: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(6).max(16).messages({
            "string.base": `currentPassword should be a type of 'text'`,
            "string.empty": `currentPassword cannot be an empty field`,
            "string.min": "currentPassword should be of minimum 6 characters",
            "string.max": "currentPassword should be of maximum 16 characters",
            "string.pattern.base": "currentPassword must contains lower case, upper case and between 6 and 16 characters",
            "any.required": `currentPassword is a required field`,
        }),
        newPassword: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(6).max(16).messages({
            "string.base": `newPassword should be a type of 'text'`,
            "string.empty": `newPassword cannot be an empty field`,
            "string.min": "newPassword should be of minimum 6 characters",
            "string.max": "newPassword should be of maximum 16 characters",
            "string.pattern.base": "newPassword must contains lower case, upper case and between 6 and 16 characters",
            "any.required": `newPassword is a required field`,
        }),
        confirmPassword: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(6).max(16).messages({
            "string.base": `confirmPassword should be a type of 'text'`,
            "string.empty": `confirmPassword cannot be an empty field`,
            "string.min": "confirmPassword should be of minimum 6 characters",
            "string.max": "confirmPassword should be of maximum 16 characters",
            "string.pattern.base": "confirmPassword must contains lower case, upper case and between 6 and 16 characters",
            "any.required": `confirmPassword is a required field`,
        })
    }),

    validateForgetApi: Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        newPassword: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(6).max(16).messages({
            "string.base": `newPassword should be a type of 'text'`,
            "string.empty": `newPassword cannot be an empty field`,
            "string.min": "newPassword should be of minimum 6 characters",
            "string.max": "newPassword should be of maximum 16 characters",
            "string.pattern.base": "newPassword must contains lower case, upper case and between 6 and 16 characters",
            "any.required": `newPassword is a required field`,
        }),
        confirmPassword: Joi.string().required().empty().regex(/^[a-zA-Z]{6,16}$/).min(6).max(16).messages({
            "string.base": `confirmPassword should be a type of 'text'`,
            "string.empty": `confirmPassword cannot be an empty field`,
            "string.min": "confirmPassword should be of minimum 6 characters",
            "string.max": "confirmPassword should be of maximum 16 characters",
            "string.pattern.base": "confirmPassword must contains lower case, upper case and between 6 and 16 characters",
            "any.required": `confirmPassword is a required field`,
        })
    }),

    validateOTP: Joi.object({
        OTP: Joi.string().required().empty().regex(/^[0-9]{6}$/).min(6).max(6).messages({
            "string.pattern.base": "OTP must contain 6 digits",
        })
    }),

    validateEmail : Joi.object({
        email: Joi.string().required().empty().email().messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "string.email": `email format not valid`,
        "any.required": `email is a required field`,
        })
    }),

    validatePhoneNumber: Joi.object({
        phoneNumber: Joi.string().required().empty().regex(/^[0-9]{10}$/).min(10).max(10).messages({
            "string.pattern.base": "phone number must contain digits and must have 10 characters without country code",
        })
    })
}