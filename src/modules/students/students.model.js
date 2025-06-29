const mongoose = require('mongoose');
const model = require('../core/model.js');

const studentsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  gpa: {type: Number, default: null}
}, {collection: 'students'});

const mongooseModel = mongoose.model('students', studentsSchema);
const studentsModel = model(mongooseModel);

module.exports = studentsModel;
