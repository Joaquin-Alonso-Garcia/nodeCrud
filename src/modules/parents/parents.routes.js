const routes = require('../core/routes.js');
const parentsModel = require('./parents.model.js');
const parentsPermissions = require('./parents.permissions.js');

module.exports = (app) => {
  const instanceRoutes = routes(app, '/parents', parentsModel, parentsPermissions);

  instanceRoutes.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
