const UnitDonor = require('../models/UnitDonor');

// POST /unit-donor
async function createUnitDonor(req, res, next) {
  try {
    const { kode, nama } = req.body;
    const unitDonor = await UnitDonor.create({ kode, nama });
    res.status(201).json(unitDonor);
  } catch (err) {
    next(err);
  }
}

// GET /unit-donor
async function getAllUnitDonor(req, res, next) {
  try {
    const data = await UnitDonor.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { createUnitDonor, getAllUnitDonor };