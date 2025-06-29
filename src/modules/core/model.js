module.exports = (mongooseModel) => {
  return {
    get: async () => {
      const result = await mongooseModel.find({});

      return result;
    },
    post: async (data) => {
      const result = await mongooseModel.create(data);

      return result;
    },
    put: async (data) => {
      const {_id, ...update} = data;

      if (!_id) {
        throw new Error('Missing _id for update');
      }

      const result = await mongooseModel.findByIdAndUpdate(_id, update, {new: true, runValidators: true});

      return result;
    },
    delete: async (data) => {
      const {_id} = data;

      if (!_id) {
        throw new Error('Missing _id for delete');
      }

      const result = await mongooseModel.findByIdAndDelete(_id);

      return result;
    }
  };
};
