const Pendonor = require('../models/Pendonor');

// Hanya field dari tabel topik yang boleh masuk dari body.
const FIELD_DITERIMA = [
  'noPendonor',
  'nama',
  'jumlahDonor',
  'status',
  'kontak',
  'unitDonorId',
];

// POST /pendonor
async function createPendonor(req, res, next) {
  try {
    const data = {};
    FIELD_DITERIMA.forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    const pendonor = await Pendonor.create(data);
    res.status(201).json(pendonor);
  } catch (err) {
    next(err);
  }
}

// GET /pendonor?status=...&sort=jumlahDonor
async function getAllPendonor(req, res, next) {
  try {
    const filter = {};
    if (req.query.status !== undefined) {
      filter.status = req.query.status;
    }

    const query = Pendonor.find(filter);

    if (req.query.sort !== undefined) {
      query.sort({ [req.query.sort]: 1 });
    }

    const data = await query;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

// GET /pendonor/:id
async function getPendonorById(req, res, next) {
  try {
    const pendonor = await Pendonor.findById(req.params.id).populate(
      'unitDonorId',
      'kode nama'
    );

    if (!pendonor) {
      const err = new Error('Data pendonor tidak ditemukan');
      err.status = 404;
      throw err;
    }

    res.status(200).json(pendonor);
  } catch (err) {
    next(err);
  }
}

module.exports = { createPendonor, getAllPendonor, getPendonorById };