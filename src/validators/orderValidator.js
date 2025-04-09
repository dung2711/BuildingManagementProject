import Joi from "joi";

export const orderCreateSchema = Joi.object({
    order_date: Joi.date().iso().required(),
    category: Joi.string().max(30).required(),
    observator: Joi.string().max(40),
    observator_phone_number: Joi.string().max(20).pattern(/^[0-9]{10,15}$/),
    floor: Joi.number().integer().required(),
    lift_required: Joi.string().required(),
    description: Joi.string().max(1000).required(),
    customer_name: Joi.string().max(100),
})

export const orderUpdateSchema = Joi.object({
    order_date: Joi.date().iso(),
    category: Joi.string().max(30),
    observator: Joi.string().max(40),
    observator_phone_number: Joi.string().max(20).pattern(/^[0-9]{10,15}$/),
    floor: Joi.number().integer(),
    lift_required: Joi.string(),
    description: Joi.string().max(1000),
    customer_name: Joi.string().max(100),
})

