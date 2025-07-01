const {sendSuccess, sendError} = require('../../utils/response.js');

module.exports = (path, model) => {
  return {
    get: async (req, res) => {
      try {
        const data = await model.get(req);
        const count = data.length;

        sendSuccess(res, data, 200, count);
      } catch (error) {
        const responseText = `Server error occurred while fetching ${path}: ${error}`;

        sendError(res, responseText, 500);
      }
    },
    post: async (req, res) => {
      try {
        const data = await model.post(req.body);
        const responseText = `New ${path} created successfully`;

        sendSuccess(res, data, 201, 1, responseText);
      } catch (error) {
        if (error.name === 'ValidationError') {
          return sendError(res, error.message, 400);
        }

        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
          const responseErrorText = 'Email already exists';

          return sendError(res, responseErrorText, 400);
        }

        const responseErrorText = `Server error occurred while posting: ${error}`;

        sendError(res, responseErrorText, 500);
      }
    },
    put: async (req, res) => {
      try {
        const data = await model.put(req.body);
        const responseText = `${path} updated successfully`;

        sendSuccess(res, data, 201, 1, responseText);
      } catch (error) {
        const responseErrorText = `Server error occurred while updting: ${error}`;

        sendError(res, responseErrorText, 500);
      }
    },
    delete: async (req, res) => {
      try {
        const data = await model.delete(req.body);
        const responseText = `${path} deleted successfully`;

        sendSuccess(res, data, 200, 1, responseText);
      } catch (error) {
        const responseErrorText = `Server error occurred while deleting: ${error}`;

        sendError(res, responseErrorText, 500);
      }
    }
  };
};
