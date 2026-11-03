# Invoice — dikit dikit visual

Invoice sederhana yang bisa diedit langsung di browser. Perhitungan item,
subtotal, discount, dan amount due berjalan otomatis. Gunakan tombol
**cetak / simpan PDF** untuk mencetak invoice atau menyimpannya sebagai PDF.
Nama PDF mengikuti format `[nomor invoice] [nama customer] dikit dikit visual`;
browser akan menambahkan ekstensi `.pdf`.
Untuk menghilangkan URL, tanggal/judul, dan nomor halaman pada PDF hasil cetak,
aturan cetak memakai margin halaman 0. Jika browser masih menampilkan informasi
tersebut, nonaktifkan opsi **Headers and footers** pada dialog cetak.

## Jalankan lokal

Buka `index.html` di browser.

## Deploy ke Vercel

Impor folder/repository ini sebagai project baru di Vercel. Tidak perlu build
command atau konfigurasi framework; `index.html` di root akan disajikan sebagai
situs statis.

Aplikasi ini tidak memerlukan backend Python karena data invoice dan
perhitungannya berjalan di browser. Font JetBrains Mono dimuat dari Google
Fonts, dengan font monospace sebagai fallback.

## Logo

Simpan logo PNG sebagai `logo/logo.png`. Slot logo sudah terpasang di invoice;
file tersebut akan dimuat otomatis saat tersedia.
"# INVOICE-DHAFI" 
