require('dotenv').config();

const express = require('express');
const cors = require('cors');

const unitDonorRoutes = require('./routes/unitDonorRoutes');
const pendonorRoutes = require('./routes/pendonorRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Hanya origin dari CORS_ORIGIN yang diizinkan, method GET dan POST.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  })
);

// Parser body JSON. Body rusak ditangani errorHandler.
app.use(express.json());

app.use('/unit-donor', unitDonorRoutes);
app.use('/pendonor', pendonorRoutes);

// Middleware paling akhir: 404 lalu error handling terpusat.
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;