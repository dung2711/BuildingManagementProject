import Joi from "joi";

export const propertyCreateSchema = Joi.object({
    name: Joi.string().max(30).required(),
    category: Joi.string().max(30).required(),
    description: Joi.string().max(1000).required(),
    numbers: Joi.number().integer().required()
})

export const propertyUpdateSchema = Joi.object({
    name: Joi.string().max(30),
    category: Joi.string().max(30),
    description: Joi.string().max(1000),
    numbers: Joi.number().integer()
})