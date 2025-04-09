import Joi from "joi";

export const complaint_feedbackCreateValidator = Joi.object({
    types: Joi.string().max(30).required(),
    category: Joi.string().max(30).required(),
    description: Joi.string().max(1000),
})

export const complaint_feedbackUpdateValidator = Joi.object({
    types: Joi.string().max(30),
    category: Joi.string().max(30),
    description: Joi.string().max(1000),
})