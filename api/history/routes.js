const { submitHistoryHandler, getUserHistoryHandler } = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/history',
    handler: submitHistoryHandler,
    options: { auth: 'jwt' }
  },
  {
    method: 'GET',
    path: '/history',
    handler: getUserHistoryHandler,
    options: { auth: 'jwt' }
  }
];