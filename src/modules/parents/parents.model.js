const mongoose = require('mongoose');
const model = require('../core/model.js');
const parentsValidator = require('./parents.validator.js');

const parentsSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  isEligible: {type: Boolean, default: false}
}, {collection: 'parents'});

const mongooseModel = mongoose.model('parents', parentsSchema);
const parentsModel = model(mongooseModel, parentsValidator);

module.exports = parentsModel;
