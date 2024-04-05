const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  cin: String,
  firstName: String,
  LastName: String,
  password: String,
  role: String,
});

const EmpModel = mongoose.model('Employee', employeeSchema);

module.exports = EmpModel;
