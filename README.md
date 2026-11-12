# uts-paw2-2428240101

RESTful API **Unit Donor Darah** untuk UTS Pengembangan Aplikasi Web II (SI5B).
Dibangun dengan Node.js, Express 5, Mongoose, dan MongoDB.

## Identitas

- Nama: Yonathan Rinfi
- NIM: 2428240101
- Kelas: SI5B
- Topik: 28. Unit Donor Darah

## Teknologi

- Node.js
- Express 5
- Mongoose
- MongoDB (server lokal)
- dotenv, cors

## Struktur Folder

```
.
├── app.js
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── pendonorController.js
│   └── unitDonorController.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   ├── Pendonor.js
│   └── UnitDonor.js
├── routes/
│   ├── pendonorRoutes.js
│   └── unitDonorRoutes.js
├── .env.example
└── .gitignore
```

## Cara Menjalankan

1. Salin berkas contoh konfigurasi.

   ```bash
   cp .env.example .env
   ```

2. Sesuaikan isi `.env`.

   ```
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/uts_paw2
   CORS_ORIGIN=http://localhost:5173
   ```

3. Pasang dependensi.

   ```bash
   npm install
   ```

4. Jalankan server.

   ```bash
   npm start
   ```

   Server hanya menerima request setelah koneksi MongoDB berhasil.

## Daftar Endpoint

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| POST | `/unit-donor` | Menambah unit donor |
| GET | `/unit-donor` | Menampilkan seluruh unit donor |
| POST | `/pendonor` | Menambah pendonor |
| GET | `/pendonor` | Menampilkan seluruh pendonor |
| GET | `/pendonor?status=tunda` | Filter status sama persis |
| GET | `/pendonor?sort=jumlahDonor` | Urut menaik berdasarkan jumlahDonor |
| GET | `/pendonor?status=aktif&sort=jumlahDonor` | Filter dan sorting digabung |
| GET | `/pendonor/:id` | Satu pendonor, `unitDonorId` di-populate |

Body `POST /unit-donor`:

```json
{ "kode": "UDD01", "nama": "UDD Palembang" }
```

Body `POST /pendonor`:

```json
{
  "noPendonor": "DNR-2428240101",
  "nama": "Yonathan Rinfi",
  "jumlahDonor": 10,
  "status": "aktif",
  "kontak": { "telepon": "081234567890", "alamat": "Palembang" },
  "unitDonorId": "<_id UnitDonor>"
}
```

## Alasan Desain Data Model

**Embedding — `kontak`.** `kontak` selalu dibaca bersama data pendonor, ukurannya kecil dan jumlahnya tetap (telepon dan alamat), serta tidak pernah di-query sebagai entitas mandiri. Menyimpannya sebagai subdocument membuat satu kali baca `GET /pendonor/:id` sudah membawa seluruh informasi kontak tanpa join tambahan.

**Referencing — `unitDonorId`.** `UnitDonor` adalah entitas pendukung yang berdiri sendiri, dipakai bersama oleh banyak pendonor, dan dapat berubah tanpa menyentuh dokumen pendonor. Menyimpannya sebagai ObjectId dengan `ref: 'UnitDonor'` menghindari duplikasi nama unit di setiap dokumen dan menjaga satu sumber kebenaran, dengan konsekuensi perlu `populate` saat menampilkan kode dan nama unit.

## Penanganan Galat

Seluruh galat melewati `middlewares/errorHandler.js` dan berbentuk `{ "message": "..." }`.

| Kondisi | Status |
| --- | --- |
| Rute tidak ada | 404 |
| Body JSON rusak | 400 |
| ID bukan ObjectId | 400 |
| Pelanggaran schema | 400 + `detail` |
| Nilai unik bentrok | 409 |
| Galat tak terduga | 500 |

## Variabel Lingkungan

| Nama | Keterangan |
| --- | --- |
| `PORT` | Port server |
| `MONGODB_URI` | Alamat koneksi MongoDB |
| `CORS_ORIGIN` | Origin yang diizinkan mengakses API |

Berkas `.env` tidak di-commit. Contoh nilainya tersedia di `.env.example`.