// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ocrRoutes = require('./routes/ocrRoutes');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Update with your actual front-end URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Set up MongoDB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Use OCR routes
app.use(ocrRoutes);

// Serve front-end files
app.use(express.static(__dirname + '/frontend'));

// Catch-all route for SPA (Single Page Application) to handle other routes
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
