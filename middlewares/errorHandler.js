/**
 * notFoundHandler: dipakai bila tidak ada route yang cocok.
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
}

/**
 * errorHandler: penanganan galat terpusat.
 * Wajib empat parameter agar Express mengenalinya sebagai error handler.
 */
function errorHandler(err, req, res, next) {
  // Body JSON rusak (body-parser melempar entity.parse.failed).
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // ID bukan ObjectId. Pesan tidak menyebut nama model.
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: `Nilai ${err.path} tidak valid`,
    });
  }

  // Pelanggaran aturan Schema (required, min, dan sebagainya).
  if (err.name === 'ValidationError') {
    const detail = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({ message: 'Data tidak valid', detail });
  }

  // Nilai unik bentrok (index MongoDB code 11000).
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'tertentu';
    return res.status(409).json({
      message: `Nilai ${field} sudah digunakan`,
    });
  }

  // Galat yang dilempar sengaja dengan status tertentu (misal 404).
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // Galat tak terduga: jangan bocorkan stack trace.
  console.error(err);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}

module.exports = { notFoundHandler, errorHandler };