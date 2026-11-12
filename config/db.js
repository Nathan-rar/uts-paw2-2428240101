const mongoose = require('mongoose');

/**
 * Menghubungkan aplikasi ke MongoDB memakai MONGODB_URI dari .env.
 * Melempar error bila koneksi gagal agar pemanggil bisa menghentikan proses.
 */
async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  return mongoose.connection;
}

module.exports = connectDB;