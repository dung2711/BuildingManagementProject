import Joi from "joi"

export const customerCreateSchema = Joi.object({
    name: Joi.string().max(100).required(),
    floor: Joi.number().integer().min(0).required(),
    rented_area: Joi.number().positive().required(),
    contract_expired_time: Joi.date().iso(),
    contact_person: Joi.string().max(40),
    contact_number: Joi.string().pattern(/^[0-9]{10,15}$/).max(20),
    director_name: Joi.string().max(40),
    director_phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).max(20),
});

export const customerUpdateSchema = Joi.object({
    name: Joi.string().max(100),
    floor: Joi.number().integer().min(0),
    rented_area: Joi.number().positive(),
    contract_expired_time: Joi.date().iso(),
    contact_person: Joi.string().max(40),
    contact_number: Joi.string().pattern(/^[0-9]{10,15}$/).max(20),
    director_name: Joi.string().max(40),
    director_phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).max(20),
});


