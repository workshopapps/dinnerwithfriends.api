const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z0-9 ]{2,30}$/)
    .min(3)
    .max(30),

  gender: Joi.string()
    .pattern(/^male$|^female$|^non-binary$|^none$/)
    .min(3)
    .max(30),
});

module.exports = updateUserSchema;