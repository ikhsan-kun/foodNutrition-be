const { registerHandler, loginHandler, profileHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: loginHandler,
  },
  {
    method: 'GET',
    path: '/profile',
    handler: profileHandler,
    options: { auth: 'jwt' }, 
  },
];

module.exports = routes;
