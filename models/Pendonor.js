const mongoose = require('mongoose');

// Embedding: kontak disimpan sebagai subdocument, tanpa _id sendiri.
const kontakSchema = new mongoose.Schema(
  {
    telepon: { type: String, trim: true },
    alamat: { type: String, trim: true },
  },
  { _id: false }
);

const pendonorSchema = new mongoose.Schema({
  noPendonor: {
    type: String,
    required: [true, 'No pendonor wajib diisi'],
    unique: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama pendonor wajib diisi'],
    trim: true,
  },
  jumlahDonor: {
    type: Number,
    required: [true, 'Jumlah donor wajib diisi'],
    min: [0, 'Jumlah donor minimal 0'],
  },
  status: {
    type: String,
    required: [true, 'Status wajib diisi'],
    trim: true,
  },
  kontak: kontakSchema,
  // Referencing: rujukan ke koleksi UnitDonor.
  unitDonorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UnitDonor',
    required: [true, 'Unit donor wajib diisi'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pendonor', pendonorSchema);