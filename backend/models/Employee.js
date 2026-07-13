const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  birthDate: { type: Date },
  hireDate: { type: Date, default: Date.now },
  salary: { type: Number, default: 0 },
  photo: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
