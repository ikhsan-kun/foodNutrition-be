const { createHistory, getUserHistory } = require('../models/historyModel');

const addHistory = async (userId, food, kalori, protein, lemak, karbo) => {
  return await createHistory(userId, food, kalori, protein, lemak, karbo);
};

const fetchUserHistory = async (userId) => {
  return await getUserHistory(userId);
};

module.exports = { addHistory, fetchUserHistory };