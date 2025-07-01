const routes = require('../core/routes.js');
const parentsModel = require('./parents.model.js');

module.exports = (app) => {
  const instanceRoutes = routes(app, '/parents', parentsModel);

  instanceRoutes.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
