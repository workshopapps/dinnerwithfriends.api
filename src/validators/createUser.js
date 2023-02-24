const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(30)
  .required(),
email: Joi.string()
  .email({ tlds: { allow: false } })
  .required(),
password: Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\\\\|,.<>\\/?])(?=.{8,30})'))
  .required()

});

module.exports = createUserSchema;
