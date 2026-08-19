# MERN Skeleton — Auth JWT + Master-Detail CRUD

Skeleton aplikasi MERN stack (MongoDB, Express, React, Node.js) dengan:

- Autentikasi JWT (register, login, `me`, route guard)
- CRUD penuh untuk resource `Item`
- Layout master-detail di frontend (daftar item di kiri, form detail di kanan)
- Styling Tailwind CSS

## Struktur folder

```
mern-skeleton/
├── server/          # Express + MongoDB (Mongoose) + JWT
│   └── src/
│       ├── config/db.js
│       ├── models/User.js
│       ├── models/Item.js
│       ├── middleware/auth.js
│       ├── controllers/authController.js
│       ├── controllers/itemController.js
│       ├── routes/authRoutes.js
│       ├── routes/itemRoutes.js
│       └── index.js
└── client/           # React + Vite + Tailwind CSS
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.jsx
        ├── components/ (Layout, PrivateRoute, ItemList, ItemDetail)
        ├── pages/ (Login, Register, Dashboard)
        └── App.jsx
```

## Menjalankan backend

```bash
cd server
cp .env.example .env   # sesuaikan MONGO_URI dan JWT_SECRET
npm install
npm run dev            # butuh nodemon, atau pakai: npm start
```

Backend berjalan di `http://localhost:5000`, pastikan MongoDB (lokal atau Atlas) sudah aktif dan `MONGO_URI` di `.env` sudah benar.

## Menjalankan frontend

```bash
cd client
cp .env.example .env    # sesuaikan VITE_API_URL bila perlu
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

## Endpoint API

| Method | Endpoint           | Keterangan                                    | Auth |
| ------ | ------------------ | --------------------------------------------- | ---- |
| POST   | /api/auth/register | Registrasi user baru                          | -    |
| POST   | /api/auth/login    | Login, mengembalikan token JWT                | -    |
| GET    | /api/auth/me       | Data user yang sedang login                   | ✅   |
| GET    | /api/items         | Daftar item (`?search=`, `?page=`, `?limit=`) | ✅   |
| GET    | /api/items/:id     | Detail satu item                              | ✅   |
| POST   | /api/items         | Buat item baru                                | ✅   |
| PUT    | /api/items/:id     | Update item                                   | ✅   |
| DELETE | /api/items/:id     | Hapus item                                    | ✅   |

Semua endpoint ber-`✅` butuh header `Authorization: Bearer <token>`.

## Pagination

`GET /api/items` mendukung pagination lewat query param:

- `page` — nomor halaman (default `1`)
- `limit` — jumlah item per halaman (default `10`, maksimal `100`)

Response-nya menyertakan metadata:

```json
{
  "items": [...],
  "total": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "hasPrevPage": false,
  "hasNextPage": true
}
```

Di frontend, `Dashboard.jsx` menyimpan state `page` dan mengirim `page`/`limit` setiap fetch. Komponen `Pagination.jsx` menampilkan tombol "Sebelumnya"/"Berikutnya" di bawah daftar item (`ItemList.jsx`), otomatis disembunyikan bila hanya ada 1 halaman. Pencarian (`search`) otomatis mereset ke halaman 1.

## Cara mengembangkan lebih lanjut

- Ganti model `Item` dengan entity sesuai domain bisnis Anda (mis. produk, siswa, anggota).
- Tambahkan role-based access dengan middleware `adminOnly` yang sudah tersedia di `middleware/auth.js`.
- Untuk validasi lebih ketat, tambahkan library seperti `express-validator` atau `zod` di sisi server.
- Untuk state management yang lebih kompleks di frontend, pertimbangkan React Query / TanStack Query untuk caching data API.
