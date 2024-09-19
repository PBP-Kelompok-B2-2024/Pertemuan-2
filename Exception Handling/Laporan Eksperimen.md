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
Paradigma pemrograman yang digunakan dalam eksperimen ini adalah **event-driven programming**. Paradigma ini berfokus pada pengaturan respons terhadap peristiwa (event) seperti klik tombol, perubahan input, atau kesalahan. Dalam eksperimen ini, event handler digunakan untuk merespons klik tombol "Tambah Barang" dan menangani kesalahan input pengguna. JavaScript mendukung event-driven programming, yang membuatnya cocok untuk pengembangan aplikasi berbasis web interaktif seperti form ini.

## Konsep Pemrograman yang Digunakan
1. **Event Handler**: Konsep ini digunakan untuk menangkap event seperti klik tombol. Ketika tombol "Tambah Barang" ditekan, event handler mengambil data dari form, memvalidasi, dan menambahkannya ke tabel.
2. **Error Handling**: Penggunaan **try-catch** untuk menangkap kesalahan saat validasi data form. Jika terjadi kesalahan, pesan error akan ditampilkan di UI dan **console**, serta dapat merusak form dalam kondisi tertentu.
3. **Global State**: Variabel global digunakan untuk menyimpan status apakah form rusak atau tidak. Ini menunjukkan bagaimana perubahan pada variabel global dapat memengaruhi fungsionalitas seluruh aplikasi.

## Keuntungan dari Penerapan Eksperimen di Industri
1. **Memperbaiki Keandalan Aplikasi**: Error handling yang tepat dapat mencegah aplikasi menerima data yang tidak valid dan menjaga kualitas data yang masuk ke sistem, terutama dalam pengelolaan inventaris.
2. **Mencegah Form Rusak**: Dengan mengetahui potensi kerusakan form, pengembang dapat memperkuat mekanisme validasi input agar error tidak membuat form atau aplikasi menjadi tidak responsif.
3. **Meminimalkan Downtime**: Dengan menangani error secara efisien, downtime aplikasi akibat crash atau form yang tidak berfungsi dapat diminimalkan, meningkatkan pengalaman pengguna dan produktivitas.
4. **Mempermudah Debugging**: Error yang muncul di console membantu pengembang dalam melakukan debugging, sehingga memudahkan dalam menemukan dan memperbaiki masalah.

## Kesimpulan
Eksperimen ini menunjukkan pentingnya **error handling** dalam pengembangan aplikasi berbasis web, khususnya dalam form pengelolaan inventaris barang. Error handling tidak hanya berfungsi untuk menangani kesalahan input, tetapi juga mencegah aplikasi menjadi rusak akibat kesalahan fatal. Pada eksperimen ini, ketika error terjadi dan form dibiarkan rusak, pengguna tidak bisa lagi menambah data valid ke tabel. Hal ini menunjukkan betapa pentingnya menangani error secara tepat untuk menjaga fungsionalitas aplikasi.

Kesimpulannya, eksperimen ini berhasil mencapai tujuan, yaitu menunjukkan bagaimana error yang tidak ditangani dapat merusak form dan fungsionalitas aplikasi. Dengan penerapan mekanisme error handling yang baik, aplikasi dapat lebih andal dan mengurangi potensi kerusakan yang terjadi di lingkungan industri.