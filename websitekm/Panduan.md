# Beasiswa Knowledge Base

> Platform pengetahuan terpusat tentang beasiswa untuk mahasiswa Indonesia.
> Dikembangkan sebagai tugas kelompok mata kuliah Knowledge Management.

---

## Daftar Isi

- [Deskripsi](#deskripsi)
- [Fitur](#fitur)
- [Struktur File](#struktur-file)
- [Cara Menjalankan Secara Lokal](#cara-menjalankan-secara-lokal)
- [Cara Memperbarui Data JSON](#cara-memperbarui-data-json)
- [Cara Deploy ke GitHub Pages](#cara-deploy-ke-github-pages)
- [Keterbatasan](#keterbatasan)

---

## Deskripsi

Beasiswa Knowledge Base adalah aplikasi web statis yang menyediakan informasi terstruktur tentang:
- Program beasiswa yang tersedia di Indonesia
- Panduan aplikasi dan persiapan dokumen
- Persyaratan kelayakan beasiswa
- Persiapan tahap seleksi dan wawancara
- Pengalaman dan pelajaran dari penerima beasiswa

Aplikasi dibangun menggunakan HTML5, CSS3, dan Vanilla JavaScript tanpa framework atau backend.

---

## Fitur

| Fitur | Keterangan |
|-------|------------|
| Home Page | Pengenalan, statistik, artikel unggulan, dan artikel terbaru |
| Categories Page | Jelajahi 5 kategori pengetahuan |
| Knowledge Library | Semua artikel dengan pencarian dan filter kategori |
| Knowledge Detail | Artikel lengkap dengan artikel terkait |
| Pencarian Real-time | Cari berdasarkan judul, deskripsi, konten, dan kata kunci |
| Filter Kategori | Filter artikel berdasarkan kategori |
| Desain Responsif | Bekerja di desktop, tablet, dan ponsel |

---

## Struktur File

```
websitekm/
├── index.html          — Halaman beranda
├── categories.html     — Halaman semua kategori
├── library.html        — Perpustakaan artikel
├── detail.html         — Detail artikel (pakai ?id=xxx)
├── about.html          — Tentang proyek
│
├── assets/
│   ├── css/
│   │   └── style.css       — Stylesheet global
│   │
│   ├── js/
│   │   ├── app.js          — Utilitas bersama (data loading, navbar, footer, rendering)
│   │   ├── home.js         — Logika halaman beranda
│   │   ├── categories.js   — Logika halaman kategori
│   │   ├── library.js      — Logika perpustakaan (search + filter)
│   │   ├── detail.js       — Logika halaman detail artikel
│   │   └── search.js       — Placeholder modul pencarian global
│   │
│   ├── data/
│   │   ├── categories.json — Data kategori
│   │   └── knowledge.json  — Data artikel pengetahuan
│   │
│   └── images/             — Folder untuk gambar (opsional)
│
└── README.md
```

---

## Cara Menjalankan Secara Lokal

> **Penting:** Aplikasi menggunakan `fetch()` untuk membaca file JSON. `fetch()` tidak berfungsi jika file HTML dibuka langsung dari file system (`file://`). Harus dijalankan melalui server HTTP lokal.

### Opsi 1: VS Code Live Server (Direkomendasikan)

1. Install ekstensi **Live Server** di VS Code.
2. Buka folder `websitekm/` di VS Code.
3. Klik kanan `index.html` → **Open with Live Server**.
4. Browser akan membuka `http://127.0.0.1:5500/`.

### Opsi 2: Python HTTP Server

```bash
# Masuk ke folder proyek
cd "D:\Semester 7\Knowledge Management\websitekm"

# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

### Opsi 3: Node.js (npx serve)

```bash
npx serve websitekm
```

---

## Cara Memperbarui Data JSON

### Menambah Artikel Baru

Buka `assets/data/knowledge.json` dan tambahkan objek baru di akhir array:

```json
{
  "id": "016",
  "title": "Judul Artikel Baru",
  "slug": "judul-artikel-baru",
  "categoryId": "CAT001",
  "description": "Deskripsi singkat artikel.",
  "keywords": ["kata kunci 1", "kata kunci 2"],
  "content": {
    "overview": "Ringkasan artikel.",
    "sections": [
      {
        "heading": "Judul Bagian",
        "body": "Isi penjelasan bagian ini."
      }
    ],
    "tips": [
      "Tips pertama.",
      "Tips kedua."
    ],
    "notes": "Catatan penting."
  },
  "source": {
    "name": "Nama Sumber",
    "type": "Official Website",
    "url": "https://example.com",
    "dateVerified": "2026-11-11"
  },
  "featured": false,
  "publishedAt": "2026-11-11"
}
```

**Aturan ID:** Gunakan format `"001"`, `"002"`, dst. ID harus unik.

**categoryId yang valid:**
- `"CAT001"` — Scholarship Information
- `"CAT002"` — Application Guide
- `"CAT003"` — Eligibility & Requirements
- `"CAT004"` — Selection Preparation
- `"CAT005"` — Scholarship Experience

**Tandai sebagai unggulan:** Set `"featured": true` untuk menampilkan di halaman beranda.

---

### Menambah Kategori Baru

Buka `assets/data/categories.json` dan tambahkan:

```json
{
  "id": "CAT006",
  "name": "Nama Kategori",
  "slug": "nama-kategori",
  "description": "Deskripsi kategori.",
  "icon": "book-open",
  "color": "#123456"
}
```

Lalu tambahkan badge CSS untuk kategori baru di `assets/css/style.css`:

```css
.badge-cat006 { background: #F0F9FF; color: #0369A1; }
```

---

## Cara Deploy ke GitHub Pages

1. **Buat repository GitHub baru** (mis. `beasiswa-knowledge-base`).

2. **Upload semua file** ke repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Beasiswa Knowledge Base"
   git remote add origin https://github.com/username/beasiswa-knowledge-base.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages:**
   - Buka repository di GitHub.
   - Klik **Settings** → **Pages**.
   - Di bagian **Source**, pilih branch `main` dan folder `/ (root)`.
   - Klik **Save**.

4. **Akses website** di: `https://username.github.io/beasiswa-knowledge-base/`

> **Catatan:** GitHub Pages mendukung file statis (HTML, CSS, JS, JSON) secara langsung. Tidak perlu konfigurasi tambahan.

---

## Keterbatasan

| Keterbatasan | Penjelasan |
|-------------|------------|
| Tidak ada backend | Data hanya dari JSON lokal — tidak ada CMS atau database |
| Tidak ada autentikasi | Semua konten bersifat publik |
| Tidak ada fitur komentar | Tidak ada interaksi pengguna |
| Konten awal merupakan sample | Harus diganti dengan hasil riset/wawancara yang terverifikasi sebelum submit final |
| `fetch()` butuh server | Tidak bisa dibuka langsung dengan double-click file HTML |
| Pencarian tidak full-text | Pencarian berbasis string matching, bukan indexing canggih |

---

## Lisensi

Proyek ini dikembangkan untuk keperluan akademis (tugas kelompok Knowledge Management).  
Konten artikel bersumber dari referensi publik yang telah dicantumkan dalam setiap artikel.

---

*Dibuat dengan HTML, CSS, dan Vanilla JavaScript. Tidak ada framework. Tidak ada backend.*

