const supabase = require('../config/db'); // pastikan ini `supabaseClient`

const createUser = async (email, username, password) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, username, password }])
    .select('id'); // optional: ambil ID user baru

  if (error) throw error;
  return data[0].id;
};

const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single(); 

  console.log('FIND USER:', { data, error }); // Tambahkan log ini

  if (error) return null;
  return data;
};

const findUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email')
    .eq('id', id)
    .single();
  if (error) return { data: null, error };
  return { data, error: null };
};

module.exports = { createUser, findUserByEmail, findUserById };
