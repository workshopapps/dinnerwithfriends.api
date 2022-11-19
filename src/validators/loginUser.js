const Joi = require('joi');

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .pattern(/^\w[a-zA-Z0-9]{8,30}$/)
    .min(8)
    .max(30)
    .required(),
});

module.exports = loginUserSchema;
