# Laporan Eksperimen : Pengelolaan Kesalahan Input pada Form Inventaris Menggunakan Error Handling di JavaScript
### Tanggal Eksperimen : 19 September 2024
### Penanggung Jawab : Muhammad Zaky Aliyashfi
### Link chatGPT : https://chatgpt.com/share/66ec63ed-1880-8002-8ef4-ee7c436d7cb6

## Deskripsi Eksperimen
Eksperimen ini bertujuan untuk mensimulasikan bagaimana kesalahan input (error handling) dapat memengaruhi fungsionalitas form dan tabel pada aplikasi pengelolaan inventaris barang. Eksperimen ini juga menunjukkan bagaimana form yang rusak akibat kesalahan input dapat menyebabkan masalah serius di aplikasi industri jika tidak ditangani dengan baik, serta bagaimana mekanisme error handling dapat digunakan untuk mencegah error yang tidak diinginkan.

## Identifikasi Problem
Di industri, aplikasi yang digunakan untuk mengelola data inventaris atau transaksi sering kali melibatkan interaksi langsung dengan pengguna melalui form. Kesalahan input pengguna, seperti nilai yang tidak valid atau kosong, dapat mengakibatkan data yang tidak akurat atau bahkan merusak fungsionalitas aplikasi, seperti gagal menambah data yang valid. Dalam kasus ini, tanpa adanya mekanisme error handling yang tepat, kesalahan tersebut bisa menyebabkan data berupa **NaN** masuk ke dalam tabel, atau lebih parah lagi, merusak keseluruhan form, mengakibatkan masalah besar dalam pengelolaan inventaris.

## Metodologi Eksperimen
1. **Membuat form untuk menambahkan barang**: Form ini akan berisi input seperti nama barang, stok barang, dan harga barang.
2. **Menerapkan tabel tracker dengan DataTables**: Setiap barang yang berhasil ditambahkan akan langsung ditampilkan di tabel menggunakan plugin DataTables.
3. **Menambahkan event handler untuk tombol 'Tambah Barang'**: Saat tombol ini ditekan, data dari form akan diambil dan ditambahkan ke tabel.
4. **Memperkenalkan error handling**: Jika terjadi error, seperti data kosong atau input yang tidak valid, maka error akan ditampilkan di console dan UI.
5. **Simulasi kerusakan form**: Kesalahan input tertentu, seperti nama barang kosong, akan menyebabkan variabel global berubah sehingga form menjadi rusak dan tidak bisa digunakan lagi.
6. **Melakukan pengujian**: Setelah form rusak, pengguna mencoba memasukkan data valid, namun form tidak lagi dapat menambah barang ke tabel.

## Paradigma Pemrograman

Paradigma pemrograman yang digunakan dalam eksperimen ini adalah **event-driven programming**. Paradigma ini berfokus pada reaksi terhadap peristiwa (event) yang terjadi selama aplikasi berjalan. Dalam konteks web development, peristiwa yang umum ditemui adalah klik tombol, perubahan input di form, atau pemuatan halaman.

Pada eksperimen ini, setiap kali pengguna berinteraksi dengan form, seperti mengklik tombol "Tambah Barang", sebuah event akan dihasilkan. Event ini dipantau oleh **event listener** yang sebelumnya telah disiapkan. Ketika event terdeteksi, handler terkait akan dieksekusi untuk melakukan tindakan tertentu, seperti mengambil data dari form, memvalidasinya, dan kemudian menambahkannya ke dalam tabel.

Berikut adalah karakteristik dari **event-driven programming** yang muncul dalam eksperimen ini:
1. **Listener**: Digunakan untuk mendeteksi peristiwa. Misalnya, event listener dipasang pada tombol "Tambah Barang" yang memonitor ketika tombol ini ditekan oleh pengguna.
2. **Handler**: Merupakan fungsi yang dipanggil ketika event terjadi. Di eksperimen ini, handler bertugas untuk membaca input dari form, memprosesnya (memvalidasi dan mengelola error), dan menambah data ke tabel.
3. **Event Flow yang Asinkron**: Event tidak harus dijalankan dalam urutan tertentu, tetapi berdasarkan kapan event itu terjadi. Misalnya, pengguna dapat mengisi form dalam urutan apa pun atau menekan tombol kapan saja, dan setiap kali tombol ditekan, event handler akan dipicu.

Pendekatan ini membuat aplikasi lebih responsif dan interaktif, karena aplikasi akan bereaksi terhadap interaksi pengguna secara langsung dan tidak bergantung pada alur pemrograman linear seperti pada paradigma procedural programming.

## Konsep Pemrograman yang Digunakan

Beberapa konsep pemrograman yang digunakan dalam eksperimen ini antara lain:

1. **Event Handler**:
   - Event handler adalah fungsi yang merespons suatu event. Dalam eksperimen ini, event handler dipasang untuk memproses event **klik** pada tombol "Tambah Barang". Ketika tombol ditekan, event handler ini akan mengambil data dari form, melakukan validasi, dan jika valid, menambahkannya ke tabel tracker.
   - Pada tahap ini, event handler tidak hanya bertugas menambah data, tetapi juga memastikan data tersebut valid sebelum dimasukkan ke dalam sistem. Jika ada kesalahan input, handler akan menangani error tersebut dan memberikan feedback yang sesuai kepada pengguna, misalnya melalui console log atau pesan error di UI.

2. **Error Handling**:
   - Error handling sangat penting untuk menjaga stabilitas aplikasi ketika terjadi kesalahan input atau kesalahan dalam proses. Dalam eksperimen ini, **error handling** dilakukan menggunakan blok **try-catch** untuk menangani kesalahan yang muncul saat proses validasi data. Jika ditemukan input yang tidak valid (misalnya field kosong atau angka yang tidak sesuai format), blok catch akan menangkap error tersebut dan mencegah eksekusi lebih lanjut yang dapat merusak fungsionalitas aplikasi.
   - Error handling membantu mencegah situasi di mana data tidak valid, seperti **NaN** (Not a Number), dimasukkan ke dalam tabel. Tanpa mekanisme ini, data tidak valid bisa masuk ke sistem dan merusak integritas data inventaris.

3. **Global State**:
   - Variabel global digunakan untuk menyimpan status apakah form dalam kondisi rusak atau tidak. Jika terjadi error yang serius (misalnya, input yang sangat tidak valid atau error yang dibiarkan terjadi tanpa ditangani), form bisa menjadi rusak dan tidak bisa dipakai lagi.
   - Dengan menggunakan variabel global untuk melacak status ini, kita bisa memantau kondisi form dan memblokir tindakan lebih lanjut jika form dalam keadaan tidak valid. Misalnya, ketika variabel global menunjukkan form rusak, pengguna tidak bisa lagi menambah barang ke dalam tabel, bahkan jika mereka memperbaiki input.

4. **Data Validation**:
   - Sebelum data dimasukkan ke dalam tabel, data harus divalidasi untuk memastikan bahwa semua input pengguna sudah benar. Jika input kosong atau tidak valid (misalnya, angka negatif untuk stok barang), sistem akan menolak untuk memprosesnya lebih lanjut.
   - Validation ini sangat penting untuk mencegah data korup atau tidak valid masuk ke dalam sistem, yang dapat menyebabkan error lebih lanjut di masa mendatang.

5. **DOM Manipulation**:
   - Konsep ini muncul ketika data baru berhasil dimasukkan ke dalam tabel. Setelah validasi berhasil, program akan memanipulasi Document Object Model (DOM) untuk menambahkan baris baru ke tabel tracker menggunakan DataTables. Ini mencerminkan respons aplikasi yang dinamis, di mana tampilan web dapat diperbarui secara langsung berdasarkan interaksi pengguna.
   
   DOM manipulation digunakan untuk mengelola tampilan dan menambahkan elemen baru secara dinamis sesuai dengan input pengguna, memastikan bahwa tabel selalu menampilkan data terbaru.

## Paradigma dan Konsep Pemrograman di Industri

Dalam konteks industri, penerapan event-driven programming dan konsep-konsep di atas memberikan beberapa keuntungan:
- **Responsif terhadap Pengguna**: Aplikasi akan lebih interaktif dan responsif terhadap tindakan pengguna, membuat pengalaman pengguna lebih baik.
- **Reliabilitas Sistem**: Error handling dan validasi input menjaga integritas data dan meminimalkan risiko kesalahan yang dapat merusak sistem.
- **Fleksibilitas Pengembangan**: Dengan event-driven programming, aplikasi dapat dikembangkan secara modular, di mana setiap event dapat diatur secara terpisah tanpa memengaruhi alur eksekusi utama aplikasi.

Kesimpulannya, penerapan event-driven programming dan konsep-konsep ini dalam eksperimen dan dunia nyata memastikan bahwa aplikasi dapat berjalan dengan lancar, meskipun berhadapan dengan kesalahan input atau gangguan lain yang mungkin terjadi.

## Keuntungan dari Penerapan Eksperimen di Industri
1. **Memperbaiki Keandalan Aplikasi**: Error handling yang tepat dapat mencegah aplikasi menerima data yang tidak valid dan menjaga kualitas data yang masuk ke sistem, terutama dalam pengelolaan inventaris.
2. **Mencegah Form Rusak**: Dengan mengetahui potensi kerusakan form, pengembang dapat memperkuat mekanisme validasi input agar error tidak membuat form atau aplikasi menjadi tidak responsif.
3. **Meminimalkan Downtime**: Dengan menangani error secara efisien, downtime aplikasi akibat crash atau form yang tidak berfungsi dapat diminimalkan, meningkatkan pengalaman pengguna dan produktivitas.
4. **Mempermudah Debugging**: Error yang muncul di console membantu pengembang dalam melakukan debugging, sehingga memudahkan dalam menemukan dan memperbaiki masalah.

## Kesimpulan
Eksperimen ini menunjukkan pentingnya **error handling** dalam pengembangan aplikasi berbasis web, khususnya dalam form pengelolaan inventaris barang. Error handling tidak hanya berfungsi untuk menangani kesalahan input, tetapi juga mencegah aplikasi menjadi rusak akibat kesalahan fatal. Pada eksperimen ini, ketika error terjadi dan form dibiarkan rusak, pengguna tidak bisa lagi menambah data valid ke tabel. Hal ini menunjukkan betapa pentingnya menangani error secara tepat untuk menjaga fungsionalitas aplikasi.

Kesimpulannya, eksperimen ini berhasil mencapai tujuan, yaitu menunjukkan bagaimana error yang tidak ditangani dapat merusak form dan fungsionalitas aplikasi. Dengan penerapan mekanisme error handling yang baik, aplikasi dapat lebih andal dan mengurangi potensi kerusakan yang terjadi di lingkungan industri.