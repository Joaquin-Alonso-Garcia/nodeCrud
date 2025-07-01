module.exports = (moduleValidator) => {
  if (!moduleValidator) {
    throw new Error('It should have a validator module');
  }

  return (body) => {
    Object.entries(moduleValidator).forEach(([key]) => {
      const rules = moduleValidator[key];
      const value = body[key];

      rules.forEach((validateFn) => {
        validateFn(value, key);
      });
    });
  };
};
