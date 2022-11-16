const Joi = require("joi");

module.exports.spanishSchemaAlso = Joi.object({
    travel: Joi.object({
        image: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required(),
});

module.exports.spanishSchema = Joi.object({
    card: Joi.object({
        card: Joi.string().required,
        hint: Joi.string().required,
        english: Joi.string().required,
        spanish: Joi.string().required,
        hintOne: Joi.string().required,
        hintTwo: Joi.string().required,
    }).required(),
});
