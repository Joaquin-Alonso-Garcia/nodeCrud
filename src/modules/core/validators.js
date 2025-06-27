module.exports = (moduleValidator) => {
  if (!moduleValidator) {
    throw new Error('Debe tener un modulo de validadores');
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
