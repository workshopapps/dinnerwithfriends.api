const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createParticipantSchema = Joi.object({
  fullname: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  event_id: Joi.objectId(),

  preferred_date_time: Joi.string().required(),
});

module.exports = createParticipantSchema;
