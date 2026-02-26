const {sendSuccess, sendError} = require('../../utils/response.js');
const permissions = require('./permissions.js');

module.exports = (path, model, modulePermissions) => {
  const instancePermissions = permissions(modulePermissions);

  return {
    get: async (req, res) => {
      try {
        const query = {...req.query};
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        if (!query.select) {
          instancePermissions('get', []);
          const result = await model.get(query, {skip, limit, page});

          return sendSuccess(res, result, 200);
        }

        const selectArray = query.select.split(/\s+/) || '';
        const select = instancePermissions('get', selectArray);
        delete query.page;
        delete query.limit;
        delete query.select;

        const result = await model.get(query, {skip, limit, page, select});

        sendSuccess(res, result, 200);
      } catch (error) {
        const responseText = `Server error occurred while fetching ${path}: ${error}`;

        sendError(res, responseText, 500);
      }
    },
    post: async (req, res) => {
      try {
        const reqBody = Object.keys(req.body);
        instancePermissions('post', reqBody);
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
        const reqBody = Object.keys(req.body);
        instancePermissions('put', reqBody);
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
        const reqBody = Object.keys(req.body);
        instancePermissions('delete', reqBody);
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
