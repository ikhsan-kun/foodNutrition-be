const { createUser, findUserByEmail } = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hashpassword');

const registerUser = async ({ email, username, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error('Email already registered');

  const hashed = await hashPassword(password);
  const userId = await createUser(email, username, hashed);
  return { id: userId, email, username };
};

const validateUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Invalid password');

  return { id: user.id, email: user.email, username: user.username };
};

module.exports = { registerUser, validateUser };
