const Joi = require('joi');

const recoverPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .pattern(/^\w[a-zA-Z0-9]{8,30}$/)
    .min(8)
    .max(30)
    .required(),
  token: Joi.string().max(5).required(),
});

module.exports = recoverPasswordSchema;
