const mongoose = require('mongoose');

const unitDonorSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode unit donor wajib diisi'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama unit donor wajib diisi'],
    trim: true,
  },
});

module.exports = mongoose.model('UnitDonor', unitDonorSchema);