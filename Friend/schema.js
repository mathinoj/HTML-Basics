const Joi = require("joi");

model.exports.cardSchema = Joi.object({
    newCard: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
    }).required(),
});
