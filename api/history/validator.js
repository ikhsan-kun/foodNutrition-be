const Joi = require('joi');

const historySchema = Joi.object({
  food: Joi.string().required(),
  kalori: Joi.number().required(),
  protein: Joi.number().required(),
  lemak: Joi.number().required(),
  karbo: Joi.number().required(),
});

module.exports = { historySchema };