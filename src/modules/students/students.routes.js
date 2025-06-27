const routes = require('../core/routes.js');

module.exports = (app) => {
  const instanceRoutes = routes(app, '/students', 'students', 'student');

  instanceRoutes.setup({
    get: true,
    post: true
  });
};
