const validators = require('./validators.js');

module.exports = (mongooseModel, moduleValidator) => {
  const instanceValidator = validators(moduleValidator);

  return {
    get: async (req) => {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;
      const result = await mongooseModel.find({}).skip(skip).limit(limit);

      const totalDocuments = await mongooseModel.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);

      return {
        result,
        pagination: {page, limit},
        totalDocuments,
        totalPages
      };
    },
    post: async (body) => {
      instanceValidator(body);
      const result = await mongooseModel.create(body);

      return result;
    },
    put: async (body) => {
      const {_id, ...update} = body;

      if (!_id) {
        throw new Error('Missing _id for update');
      }

      const result = await mongooseModel.findByIdAndUpdate(_id, update, {new: true, runValidators: true});

      return result;
    },
    delete: async (body) => {
      const {_id} = body;

      if (!_id) {
        throw new Error('Missing _id for delete');
      }

      const result = await mongooseModel.findByIdAndDelete(_id);

      return result;
    }
  };
};
