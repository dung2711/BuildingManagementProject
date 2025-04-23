import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().max(50).email().required(),
    password: Joi.string().max(300).required(),
})

export const changePasswordValidator = Joi.object({
    currentPassword: Joi.string().max(300).required(),
    newPassword: Joi.string().max(300).required(),
})