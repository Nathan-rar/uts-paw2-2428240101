const express = require('express');
const { createUnitDonor, getAllUnitDonor } = require('../controllers/unitDonorController');

const router = express.Router();

router.post('/', createUnitDonor);
router.get('/', getAllUnitDonor);

module.exports = router;