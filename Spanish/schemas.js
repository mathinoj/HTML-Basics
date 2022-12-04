const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
// const Joi = require("joi");
// const { builtinModules } = require("module");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML.",
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error("string.escapeHTML", { value });
                return clean;
            },
        },
    },
});

const Joi = BaseJoi.extend(extension);

module.exports.spanishSchemaAlso = Joi.object({
    travel: Joi.object({
        // image: Joi.string().required(),
        title: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
});

module.exports.spanishSchema = Joi.object({
    card: Joi.object({
        // card: Joi.string().required(),
        // hint: Joi.string().required(),
        english: Joi.string().required(),
        spanish: Joi.string().required(),
        hintOne: Joi.string().required(),
        hintTwo: Joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required().escapeHTML(),
    }).required(),
});
