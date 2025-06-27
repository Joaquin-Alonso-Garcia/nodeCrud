module.exports = (mongooseModel) => {
  return {
    get: async () => {
      const data = await mongooseModel.find({});
      console.log('🚀 ~ data:', data);

      return data;
    },
    post: async () => {
      const response = await mongooseModel.create({
        name: 'Gustavo',
        email: 'gustavo@idukay.com',
        isEligible: false
      });

      return response;
    }
  };
};
