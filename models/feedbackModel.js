const supabase = require('../config/db');

// Ambil semua feedback beserta nama user
const getAllFeedbackWithUser = async () => {
  const { data, error } = await supabase
    .from('feedback')
    .select('id, message, rating, created_at, users(username)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Tambahkan feedback baru
const createFeedback = async (userId, message, rating) => {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{ user_id: userId, message, rating }])
    .select('id');

  if (error) throw error;
  return data[0].id;
};

// Ambil feedback milik user tertentu
const getUserFeedback = async (userId) => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

module.exports = {
  createFeedback,
  getUserFeedback,
  getAllFeedbackWithUser,
};
