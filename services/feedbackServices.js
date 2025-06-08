const { createFeedback, getUserFeedback, getAllFeedbackWithUser } = require('../models/feedbackModel');

const addFeedback = async (userId, message, rating) => {
  return await createFeedback(userId, message, rating);
};

const fetchUserFeedback = async (userId) => {
  return await getUserFeedback(userId);
};
const fetchAllFeedbackWithUser = async () => {
  return await getAllFeedbackWithUser();
};
module.exports = { addFeedback, fetchUserFeedback, fetchAllFeedbackWithUser };
