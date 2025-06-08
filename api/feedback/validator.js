const Joi = require("joi");

const feedbackSchema = Joi.object({
  message: Joi.string().min(5).required(),
  rating: Joi.number().min(1).max(5).optional(),
});

module.exports = { feedbackSchema };
