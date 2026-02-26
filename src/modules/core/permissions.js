module.exports = (modulePermissions) => {
  return (httpMethod, fields) => {
    if (!modulePermissions) {
      return;
    }

    const allowedMethod = modulePermissions[httpMethod];

    if (!allowedMethod) {
      throw new Error(`No permissions defined for HTTP method: ${httpMethod}`);
    }

    if (!fields || fields.length === 0) {
      return allowedMethod;
    }

    const filteredFields = fields.filter((field) => {
      const fieldExists = allowedMethod.includes(field);

      if (!fieldExists) {
        throw new Error(`The specified field: ${field} is not a field you can access`);
      }

      return fieldExists;
    });

    return filteredFields;
  };
};
