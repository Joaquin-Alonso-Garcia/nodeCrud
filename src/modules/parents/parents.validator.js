const parentsModel = require('./parents.model.js');

const validator = () => ({
  required: () => (value, field) => {
    if (!value) {
      throw new Error(`${field} is required`);
    }
  },
  maxLength: (expectedLength) => (value, field) => {
    if (value.length > expectedLength) {
      throw new Error(`The ${field} must not have more than ${expectedLength} characters`);
    }
  },
  emailUnique: () => async (value, field) => {
    const existingMail = await parentsModel.findOne({email: value});

    if (existingMail) {
      throw new Error(`The ${field} must be unique`);
    }
  },
  emailFormat: () => (value, field) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error(` The ${field} must be a valid email address`);
    }
  }
});

module.exports = {
  name: [validator().required(), validator().maxLength(10)],
  email: [validator().required(), validator().emailUnique, validator().emailFormat()]
};
