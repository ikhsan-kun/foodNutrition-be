const supabase = require('../config/db');

// Tambahkan history baru
const createHistory = async (userId, food, kalori, protein, lemak, karbo) => {
  const { data, error } = await supabase
    .from('history')
    .insert([{ user_id: userId, food, kalori, protein, lemak, karbo }])
    .select('id');

  if (error) throw error;
  return data[0].id;
};

// Ambil history milik user tertentu
const getUserHistory = async (userId) => {
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', userId)
    .order('detected_at', { ascending: false });

  if (error) throw error;
  return data;
};

module.exports = {
  createHistory,
  getUserHistory,
};