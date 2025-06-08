const { registerUser, validateUser } = require("../../services/userService");
const { generateToken } = require("../../utils/jwt");
const { registerSchema, loginSchema } = require("./validator");

const registerHandler = async (request, h) => {
  try {
    const { error } = registerSchema.validate(request.payload);
    if (error) return h.response({ error: error.message }).code(400);

    const user = await registerUser(request.payload);
    return h.response({ message: "User registered", user }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

const loginHandler = async (request, h) => {
  try {
    const { error } = loginSchema.validate(request.payload);
    if (error) return h.response({ error: error.message }).code(400);

    const user = await validateUser(request.payload);
    const token = generateToken({ id: user.id, username: user.username });

    return h.response({ message: "Login success", loginResult: { token } }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(401);
  }
};

const profileHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const { data, error } = await require('../../models/userModel').findUserById(userId);
    if (error || !data) return h.response({ error: "User not found" }).code(404);
    return h.response({ profile: { username: data.username, email: data.email } }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

module.exports = { registerHandler, loginHandler, profileHandler };
