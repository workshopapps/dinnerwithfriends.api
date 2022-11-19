const Joi = require('joi');

const createParticipantSchema = Joi.object({
    fullname: Joi.string()
    .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
    .min(3)
    .max(30)
    .required(),

    email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

    // participant_id: Joi.object(),

    prefered_date_time: Joi.date().required(),
});

module.exports = createParticipantSchema;
