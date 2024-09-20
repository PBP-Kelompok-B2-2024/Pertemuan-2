# Pertemuan 2 PBP Praktik Kelompok B2

## Anggota Kelompok
- Adrian Pratama Sasmita (231524033)
- Alya Naila Putri Ashadilla (231524036)
- Faisal Bashri Albir (231524042)
- Muhammad Hasbi Asshidiqi (231524054)
- Muhammad Samudera Bagja (231524058)
- Muhammad Zaky Aliyashfi (231524059)
- Yahya Alfon Sinaga (231524064)

## Pendahuluan
Pada pertemuan kedua, kami melanjutkan pembahasan mengenai **WebSocket**. WebSocket adalah protokol komunikasi yang menyediakan saluran komunikasi full-duplex melalui koneksi tunggal TCP. Tidak seperti HTTP, di mana komunikasi hanya terjadi secara satu arah, WebSocket memungkinkan komunikasi dua arah yang lebih cepat dan real-time.

WebSocket sering digunakan dalam aplikasi seperti obrolan (chat), permainan online, dan aplikasi real-time lainnya yang membutuhkan pembaruan data secara instan tanpa perlu melakukan request berulang-ulang.

## Dasar-dasar WebSocket
### Apa itu WebSocket?
WebSocket adalah teknologi yang memungkinkan adanya komunikasi dua arah antara client dan server. Hal ini sangat berguna dalam pengembangan aplikasi real-time karena memungkinkan data dikirimkan dari server ke client tanpa harus menunggu client untuk mengirimkan request terlebih dahulu.

### Cara Kerja WebSocket
1. **Handshake**: Koneksi WebSocket diawali dengan handshake HTTP antara client dan server. Selama handshake, client mengirimkan request ke server dengan header khusus yang menunjukkan bahwa koneksi akan di-upgrade ke WebSocket.
2. **Koneksi Terbuka**: Setelah handshake berhasil, koneksi TCP tetap terbuka, dan client serta server dapat bertukar data secara real-time.
3. **Komunikasi Full-Duplex**: Baik client maupun server dapat mengirim dan menerima pesan kapan saja tanpa harus menunggu request.
4. **Menutup Koneksi**: Koneksi WebSocket dapat ditutup kapan saja oleh client atau server.

### Keunggulan WebSocket
- **Latensi Rendah**: WebSocket mengurangi latensi karena tidak perlu membuat koneksi baru untuk setiap komunikasi.
- **Efisiensi Jaringan**: Dengan satu koneksi yang tetap terbuka, WebSocket lebih efisien dalam menggunakan bandwidth dibandingkan polling HTTP.
- **Pembaruan Data Real-Time**: Sangat cocok untuk aplikasi yang membutuhkan pembaruan data real-time, seperti aplikasi obrolan, notifikasi, atau perdagangan saham.

## Eksperimen
Pada pertemuan ini, kami melakukan eksperimen sederhana untuk memahami cara kerja WebSocket. Eksperimen ini melibatkan pembuatan aplikasi obrolan berbasis WebSocket di mana pengguna dapat berkomunikasi secara real-time. Kami menggunakan **library ws** di Node.js untuk mengimplementasikan server WebSocket, dan klien dapat terhubung menggunakan browser atau aplikasi khusus.

### Langkah-Langkah:
1. Membuat server WebSocket sederhana menggunakan Node.js dan library `ws`.
2. Menjalankan server dan menghubungkan beberapa klien melalui browser.
3. Mengamati bagaimana pesan dikirimkan dari satu klien ke klien lain melalui server secara real-time tanpa harus menunggu request.

## Kesimpulan
WebSocket memberikan solusi yang sangat efisien untuk aplikasi yang memerlukan komunikasi dua arah secara real-time. Dengan memahami dasar-dasar WebSocket dan cara kerjanya, kami memperoleh wawasan penting mengenai bagaimana protokol ini dapat digunakan dalam aplikasi modern, terutama yang membutuhkan latensi rendah dan pembaruan data secara instan.

---

Untuk pertemuan berikutnya, kami akan mengeksplorasi lebih lanjut implementasi WebSocket dalam skenario yang lebih kompleks, serta membandingkannya dengan **WebRTC** untuk keperluan komunikasi peer-to-peer.

