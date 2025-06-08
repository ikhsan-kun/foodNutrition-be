const nutritionModel = require('../models/nutritionModel');

const addHistory = async (userId, nutritionData) => {
  // Bisa tambahkan validasi, transformasi, dsb di sini
  return await nutritionModel.createHistory(
    userId,
    nutritionData.food,
    nutritionData.kalori,
    nutritionData.protein,
    nutritionData.lemak,
    nutritionData.karbo
  );
};

const getHistory = async (userId) => {
  return await nutritionModel.getUserHistory(userId);
};

module.exports = { addHistory, getHistory };