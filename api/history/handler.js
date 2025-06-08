const { addHistory, fetchUserHistory } = require('../../services/historyService');
const { historySchema } = require('./validator');

const submitHistoryHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  const { food, kalori, protein, lemak, karbo } = request.payload;

  const { error } = historySchema.validate({ food, kalori, protein, lemak, karbo });
  if (error) return h.response({ error: error.message }).code(400);

  try {
    const historyId = await addHistory(userId, food, kalori, protein, lemak, karbo);
    return h.response({ message: 'History submitted', historyId }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

const getUserHistoryHandler = async (request, h) => {
  const userId = request.auth.credentials.id;
  try {
    const history = await fetchUserHistory(userId);
    return h.response({ history }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(500);
  }
};

module.exports = { submitHistoryHandler, getUserHistoryHandler };