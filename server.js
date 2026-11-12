require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const Pendonor = require('./models/Pendonor');
const UnitDonor = require('./models/UnitDonor');

async function start() {
  try {
    const connection = await connectDB();
    console.log(`Terhubung ke MongoDB: ${connection.name}`);

    // Pastikan index unik sudah dibuat sebelum server menerima request.
    await Promise.all([Pendonor.init(), UnitDonor.init()]);

    // Server baru menerima request setelah koneksi berhasil.
    app.listen(Number(process.env.PORT), () => {
      console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Gagal terhubung ke MongoDB:', err.message);
    process.exit(1);
  }
}

start();