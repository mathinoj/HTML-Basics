const Joi = require("joi");

const cardSchema = Joi.object({
    // https://joi.dev/api/?v=17.7.0
    newCard: Joi.object({
        english: Joi.string().required(),
        spanish: Joi.string().required(),
        hintOne: Joi.string().required(),
        hintTwo: Joi.string().required(),
        number: Joi.number().required().min(0),
    }).required(),
});
