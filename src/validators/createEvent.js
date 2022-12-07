const Joi = require('joi');

const createEventSchema = Joi.object({
    event_title: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required(),

    event_description: Joi.string()
        .trim()
        .min(3)
        .required(),

    location: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z ]{2,30}$/)
        .trim()
        .required()
        .min(3),

    user_id: Joi.required(),

    start_date: Joi.string().trim().required(),

    end_date: Joi.string().trim().required(),

    host_prefered_time: Joi.string().required().trim(),

    participant_number: Joi.number().required(),

    event_type: Joi.string().trim().required(),

});

module.exports = createEventSchema;
