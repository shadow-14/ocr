const mongoose = require('mongoose');

const ocrSchema = new mongoose.Schema({
  identificationNumber: String,
  name: String,
  lastName: String,
  dateOfBirth: String,
  dateOfIssue: String,
  dateOfExpiry: String,
  timestamp: { type: Date, default: Date.now },
  status: String,
  errorMessage: String
});

const OCRModel = mongoose.model('OCRModel', ocrSchema);

module.exports = OCRModel;
