const Joi = require("joi");

moduel.exports.cardSchema = Joi.object({
    // https://joi.dev/api/?v=17.7.0
    newCard: Joi.object({
        english: Joi.string().required(),
        spanish: Joi.string().required(),
        hintOne: Joi.string().required(),
        hintTwo: Joi.string().required(),
        number: Joi.number().required().min(0),
    }).required(),
});

//this schemas is NOT the mongoose schema that's confusing. It's just a pattern for a JavaScript object that we've defined in our schema file using JOI methods.
