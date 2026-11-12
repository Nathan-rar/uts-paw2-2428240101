const express = require('express');
const {
  createPendonor,
  getAllPendonor,
  getPendonorById,
} = require('../controllers/pendonorController');

const router = express.Router();

router.post('/', createPendonor);
router.get('/', getAllPendonor);
router.get('/:id', getPendonorById);

module.exports = router;