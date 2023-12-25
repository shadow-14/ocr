// src/controllers/ocrController.js

const Tesseract = require('tesseract.js');
const OCRModel = require('../models/ocrModel');

async function performOCR(imageBuffer) {
  try {
    const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
    return parseOCRResult(text);
  } catch (error) {
    throw new Error('OCR failed');
  }
}

function parseOCRResult(ocrText) {
  const lines = ocrText.split('\n');

  // Example parsing logic (assuming specific patterns):
  const idNumber = lines.find(line => line.includes('Identification Number'))?.split(' ')[1];
  const name = lines.find(line => line.includes('Name'))?.split(' ')[1];
  const lastName = lines.find(line => line.includes('Last Name'))?.split(' ')[1];
  const dob = lines.find(line => line.includes('Date of Birth'))?.split(' ')[1];
  const issueDate = lines.find(line => line.includes('Date of Issue'))?.split(' ')[1];
  const expiryDate = lines.find(line => line.includes('Date of Expiry'))?.split(' ')[1];

  return {
    identificationNumber: idNumber || '',
    name: name || '',
    lastName: lastName || '',
    dateOfBirth: dob || '',
    dateOfIssue: issueDate || '',
    dateOfExpiry: expiryDate || ''
  };
}

module.exports = {
  performOCR
};
