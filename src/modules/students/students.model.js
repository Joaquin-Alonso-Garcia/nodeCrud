const mongoose = require('mongoose');
const model = require('../core/model.js');
const studentsValidator = {};

const studentsSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  gpa: {type: Number, default: null}
}, {collection: 'students'});

const mongooseModel = mongoose.model('students', studentsSchema);
const studentsModel = model(mongooseModel, studentsValidator);

module.exports = studentsModel;
