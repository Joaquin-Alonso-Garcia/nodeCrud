const routes = require('../core/routes.js');
const studentsModel = require('./students.model.js');
const studentsPermissions = require('./students.permissions.js');

module.exports = (app) => {
  const instanceRoutes = routes(app, '/students', studentsModel, studentsPermissions);

  instanceRoutes.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
