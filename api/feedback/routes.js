const {
  submitFeedbackHandler,
  getUserFeedbackHandler,
  getAllFeedbackHandler
} = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/feedback',
    handler: submitFeedbackHandler,
    options: {
      auth: 'jwt', 
    },
  },
  {
    method: 'GET',
    path: '/feedback',
    handler: getUserFeedbackHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/all/feedback',
    handler: getAllFeedbackHandler,
    options: {
      auth: 'jwt',
    },
  },
];
