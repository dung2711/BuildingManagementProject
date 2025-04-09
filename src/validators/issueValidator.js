import Joi from "joi";

export const technical_issueCreateSchema = Joi.object({
    name: Joi.string().max(30).required(),
    category: Joi.string().max(30).required(),
    numbers: Joi.number().integer(),
    description: Joi.string().max(1000),
    customer_name: Joi.string().max(100).required(),
})

export const technical_issueUpdateSchema = Joi.object({
    name: Joi.string().max(30),
    category: Joi.string().max(30),
    numbers: Joi.number().integer(),
    description: Joi.string().max(1000),
    customer_name: Joi.string().max(100),
})