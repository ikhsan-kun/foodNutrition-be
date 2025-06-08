const { addFeedback, fetchUserFeedback, fetchAllFeedbackWithUser } = require('../../services/feedbackServices');
const { feedbackSchema } = require('./validator');
const { generateToken } = require("../../utils/jwt");

const submitFeedbackHandler = async (request, h) => {
  const { message, rating } = request.payload;
  const userId = request.auth.credentials.id;

  const { error } = feedbackSchema.validate({ message, rating });
  if (error) return h.response({ error: error.message }).code(400);

  try {
    const feedbackId = await addFeedback(userId, message, rating);
    return h.response({ message: 'Feedback submitted', feedbackId }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getUserFeedbackHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  try {
    const feedback = await fetchUserFeedback(userId);
    return h.response({ feedback }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getAllFeedbackHandler = async (request, h) => {
  try {
    const feedback = await fetchAllFeedbackWithUser();
    return h.response({ feedback }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

module.exports = {
  submitFeedbackHandler,
  getUserFeedbackHandler,
  getAllFeedbackHandler
};
