const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .pattern(/^\w[a-zA-Z0-9]{8,30}$/)
    .min(8)
    .max(30)
    .required(),
});

module.exports = createUserSchema;
