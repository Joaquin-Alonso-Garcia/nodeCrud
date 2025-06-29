const routes = require('../core/routes.js');
const studentsModel = require('./students.model.js');

module.exports = (app) => {
  const instanceRoutes = routes(app, '/students', studentsModel, 'student');

  instanceRoutes.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
