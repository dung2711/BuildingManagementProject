import Joi from "joi";

export const userCreateSchema = Joi.object({
    email: Joi.string().max(50).email().required(),
    password: Joi.string().max(300).required(),
    authentication: Joi.string().valid("customer", "admin", "manager").required(),
    name: Joi.string().max(40),
    phone_number: Joi.string().max(20).pattern(/^[0-9]{10,15}$/),
    identification: Joi.string().max(20).pattern(/^[0-9]{10,15}$/),
    customer_name: Joi.string().max(100).when("authentication", {
        is: "customer",
        then: Joi.required().messages({
          "any.required": "customer_name is required when role is 'customer'",
        })
      }),
})

export const userUpdateSchema = Joi.object({
    authentication: Joi.string().valid("customer", "admin", "manager"),
    name: Joi.string().max(40),
    phone_number: Joi.string().max(20).pattern(/^[0-9]{10,15}$/),
    identification: Joi.string().max(20).pattern(/^[0-9]{10,15}$/),
    customer_name: Joi.string().max(100),
})
