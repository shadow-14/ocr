const express = require('express');
const multer = require('multer');
const ocrController = require('../controllers/ocrController');
const OCRModel = require('../models/ocrModel');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/api/ocr', upload.single('idCardImage'), async (req, res) => {
  try {
    // Perform OCR using the ocrController
    const ocrData = await ocrController.performOCR(req.file.buffer);

    // Save OCR data to MongoDB using the OCRModel
    const ocrRecord = new OCRModel({
      ...ocrData,
      status: 'success'
    });
    await ocrRecord.save();

    // Send JSON response
    res.json(ocrData);
  } catch (error) {
    // Handle OCR failure
    const ocrRecord = new OCRModel({
      status: 'failure',
      errorMessage: error.message
    });
    await ocrRecord.save();

    // Send error response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
