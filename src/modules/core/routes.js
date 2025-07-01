const services = require('./services.js');

module.exports = (app, path, model) => {
  const instanceService = services(path, model);

  return {
    setup: (methods) => {
      if (methods.get === true) {
        app.get(path, instanceService.get);
      }

      if (methods.post === true) {
        app.post(path, instanceService.post);
      }

      if (methods.put === true) {
        app.put(path, instanceService.put);
      }

      if (methods.delete === true) {
        app.delete(path, instanceService.delete);
      }
    }
  };
};
