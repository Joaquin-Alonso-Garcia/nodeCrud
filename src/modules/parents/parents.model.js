const mongoose = require('mongoose');
const model = require('../core/model.js');

const parentsSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  isEligible: {type: Boolean}
}, {collection: 'parents'});

const mongooseModel = mongoose.model('parents', parentsSchema);
const parentsModel = model(mongooseModel);

module.exports = parentsModel;
