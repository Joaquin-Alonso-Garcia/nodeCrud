const studentsRoute = require('./students.routes.js');

module.exports = (app) => {
  studentsRoute(app);
};
