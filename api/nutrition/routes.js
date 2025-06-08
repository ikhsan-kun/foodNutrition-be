const { analyzeHandler } = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/analyze',
    handler: analyzeHandler,
    options: {
      auth: 'jwt',
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
        maxBytes: 10 * 1024 * 1024,
        allow: 'multipart/form-data',
      },
    },
  },
];