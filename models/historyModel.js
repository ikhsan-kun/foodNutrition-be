const supabase = require('../config/db');

// Fungsi untuk menyimpan history deteksi makanan
const createHistory = async (userId, food, kalori, protein, lemak, karbo) => {
  const { data, error } = await supabase
    .from('history')
    .insert([{ user_id: userId, food, kalori, protein, lemak, karbo }])
    .select('id'); 
  if (error) throw error;
  return data[0].id;
};

// Fungsi untuk mendapatkan riwayat pengguna tertentu
const getUserHistory = async (userId) => {
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', userId)
    .order('detected_at', { ascending: false });

  if (error) throw error;
  return data;
};

module.exports = { createHistory, getUserHistory };
