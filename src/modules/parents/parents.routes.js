const routes = require('../core/routes.js');
const parentsModel = require('./parents.model.js');

module.exports = (app) => {
  const instanceRoutes = routes(app, '/parents', parentsModel, 'parent');

  instanceRoutes.setup({
    get: true,
    post: true
  });
};
