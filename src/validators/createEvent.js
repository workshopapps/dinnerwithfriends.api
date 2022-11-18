const Joi = require('joi');

const createEventSchema = Joi.object({
    title: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
        .min(3)
        .max(150)
        .required(),

    description: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
        .min(3)
        .required(),

    location: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
        .min(3),

    user_id: Joi.required(),

    participant_id: Joi.object(),

    time_slots: Joi.object(),

    start_time: Joi.date().required(),

    end_time: Joi.date().required(),
});

module.exports = createEventSchema;
