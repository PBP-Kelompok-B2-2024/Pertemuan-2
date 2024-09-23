# Peningkatan Efisiensi Kolaborasi Dokumen melalui WebSocket dalam Aplikasi Pengeditan Real-Time
### Penanggung Jawab: Alya Naila Putri Ashadilla
### link gpt: https://chatgpt.com/share/66f01380-7e8c-8008-9377-a5061c015f72
### tanggal eksperimen: 22 September 2024

##  Real-Time Collaborative Document Editor
### Source Code GitHub
https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app?tab=readme-ov-file 

### Deskripsi Aplikasi 
 Real-Time Collaborative Document Editor adalah aplikasi canggih yang dirancang untuk memfasilitasi pengeditan dokumen bersama secara bersamaan oleh banyak pengguna secara real-time. Proyek ini memanfaatkan kekuatan teknologi web modern, termasuk NestJS untuk backend, WebSocket untuk komunikasi real-time, dan mekanisme autentikasi yang kuat untuk memastikan keamanan data dan privasi pengguna.

### Fitur Utama
  1. Real-Time Collaboration
  2. Document & users management
  3. Identification/mapping of websocket client with database user
  4. Authentication & Authorization
  5. Conflict Resolution
  6. Persistence
  7. Maintaining DTO’s (Data Transfer Object)
  8. Class-Validator & Class-Transformer

### TECHNOLOGY STACK  
  1. Frontend : ReactJS, state management(ContextAPI), TailwindCSS
  2. Backend : NestJS, WebSockets Gateway, Socket.io-client, Mongoose, Mongo-Atlas, JWT(JSON web token - HMAC with SHA-256), Typescript


### VIDEO-DEMO URL ->
--------------------------------------------------------------------------------------------------------
  1. Frontend :
      
       Part 1 - https://www.loom.com/share/ef97f7ba1e16435baf3506f7e2333ab8?sid=9ab4cb8c-39a9-48ea-9cde-c55c023b6e76

       Part 2 - https://www.loom.com/share/db0d9a09a1a64a1196e2fb717db1fea2?sid=82fe327b-9ff7-4d4b-88e8-871ac0c95c7b
     
  3. Backend :
                https://www.loom.com/share/d32ac1f69e454fbab57841eb05fe958a?sid=1b64a82b-9707-4481-908b-3f087d283069

### PROJECT SNAPSHOTS ->
--------------------------------------------------------------------------------------------------------
![Screenshot (19)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/4e9c93d3-9b8d-4170-8683-41b3c9cdf44d)


![Screenshot (21)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/d8d46bcc-af22-40d3-964e-707766b51522)


![Screenshot (22)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/37f102ba-e5d4-4083-8b7f-660db28e2cb9)


![Screenshot (26)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/bec637a6-c544-4f26-877b-5cd6dc594647)


![Screenshot (28)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/ee8a2558-3320-40be-9f96-b40d3f5e2c16)


![Screenshot (33)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/b7bea3c8-584d-4247-924f-dbe96bc2bd24)


![Screenshot (35)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/179da481-b196-410e-a4ce-d56cd1b43442)

## Eksperimen
### Deskripsi Eksperimen
Tujuan eksperimen ini adalah untuk mengembangkan dan mengimplementasikan aplikasi kolaborasi dokumen yang memungkinkan banyak pengguna untuk melakukan pengeditan secara bersamaan dan real-time. Dengan memanfaatkan WebSocket untuk komunikasi, eksperimen ini bertujuan untuk meningkatkan produktivitas dan efisiensi dalam kolaborasi tim, serta memastikan keamanan data pengguna melalui autentikasi dan otorisasi yang kuat.

### Identifikasi Problem
- **Konteks Permasalahan**: Banyak organisasi yang mengalami kesulitan dalam kolaborasi dokumen secara efisien, terutama dalam konteks kerja jarak jauh. Alat kolaborasi yang ada sering kali tidak mendukung pengeditan real-time, menyebabkan miskomunikasi dan kebingungan.
  
- **Permasalahan**: Kurangnya alat yang mendukung pengeditan dokumen secara real-time menyebabkan masalah seperti keterlambatan dalam pembaruan, pengulangan kerja, dan komunikasi yang tidak efisien.

- **Solusi**: Membangun aplikasi kolaborasi berbasis web menggunakan WebSocket untuk menyediakan pengalaman pengeditan dokumen yang real-time, memungkinkan pengguna untuk berkolaborasi dengan lebih efektif.

### Urgensi
Urgensi eksperimen ini sangat tinggi, mengingat tren kerja jarak jauh yang semakin meningkat dan kebutuhan akan alat yang mendukung kolaborasi efisien. Aplikasi ini memberikan solusi praktis bagi tim untuk berkomunikasi dan bekerja bersama secara lebih produktif, terutama dalam lingkungan yang sangat dinamis.

### Metodologi Eksperimen
1. **Riset dan Perencanaan**: Mengidentifikasi kebutuhan pengguna dan masalah yang ada dalam kolaborasi dokumen.
2. **Pengembangan Backend**: Menggunakan NestJS untuk membuat API dan logika aplikasi, termasuk autentikasi dan manajemen pengguna.
3. **Implementasi WebSocket**: Mengatur komunikasi real-time antara klien dan server menggunakan WebSocket.
4. **Pengembangan Frontend**: Membangun antarmuka pengguna yang intuitif untuk pengeditan dokumen.
5. **Pengujian Fitur**: Menguji fitur-fitur utama seperti manajemen dokumen, konflik resolusi, dan autentikasi.
6. **Evaluasi**: Mengumpulkan umpan balik dari pengguna dan melakukan perbaikan berdasarkan hasil pengujian.

### Hasil Eksperimen
- **Pemaparan Hasil**: Setelah penerapan WebSocket, pengguna dapat melihat perubahan secara real-time tanpa keterlambatan. Ini mengurangi kesalahan komunikasi dan meningkatkan pengalaman kolaborasi.
  
- **Perbandingan Sebelum dan Sesudah**: Sebelum implementasi, pengguna harus menunggu pembaruan dari pengguna lain. Setelah implementasi, perubahan muncul secara instan, meningkatkan efisiensi.

- **Aspek Pemrograman**:
  - **Paradigma yang Digunakan**:
    - **Pemrograman Berorientasi Objek (OOP)**:
      - **Definisi**: Paradigma ini mengorganisasi kode ke dalam objek yang memiliki atribut (data) dan metode (fungsi).
      - **Manfaat**: Memudahkan pengelolaan kode, meningkatkan pemeliharaan, dan memungkinkan penggunaan kembali kode.
      - **Karakteristik**: Menggunakan enkapsulasi, pewarisan, dan polimorfisme untuk struktur yang lebih modular dan fleksibel.

    - **Pemrograman Berbasis Acara**:
      - **Definisi**: Paradigma ini mengandalkan peristiwa (events) untuk memicu eksekusi kode.
      - **Manfaat**: Meningkatkan responsivitas aplikasi dengan memproses interaksi pengguna secara langsung.
      - **Karakteristik**: Menggunakan callback, listener, dan event-driven architecture untuk menangani interaksi secara efisien.

  - **Konsep yang Digunakan**: 
    - **Komunikasi Real-Time**: Menggunakan WebSocket untuk memungkinkan pengiriman dan penerimaan pesan secara instan antara klien dan server, mendukung interaksi langsung saat kolaborasi.
    - **Autentikasi dan Otorisasi**: Mengimplementasikan mekanisme yang menjamin hanya pengguna terautentikasi yang dapat mengakses dokumen, melindungi data dan privasi pengguna.
    - **Resolusi Konflik**: Mengelola situasi di mana beberapa pengguna melakukan pengeditan yang bersamaan pada dokumen yang sama, untuk mencegah kehilangan data.

- **Hubungan Eksperimen dengan Paradigma dan Konsep**: 
  - Eksperimen ini memanfaatkan OOP untuk struktur kode yang terorganisir dan mudah dipelihara, serta pemrograman berbasis acara melalui WebSocket untuk mendukung interaksi real-time. Konsep komunikasi real-time melalui WebSocket sangat penting untuk memenuhi tujuan eksperimen, yaitu menyediakan pengalaman kolaborasi yang mulus dan responsif bagi pengguna.

### Kesimpulan
Eksperimen ini berhasil mencapai tujuan yang ditetapkan, yaitu mengembangkan aplikasi kolaborasi dokumen yang memungkinkan pengguna untuk berkolaborasi secara real-time. Dengan mengimplementasikan WebSocket, aplikasi ini tidak hanya meningkatkan efisiensi kolaborasi tetapi juga memberikan pengalaman pengguna yang lebih baik. Hasilnya menunjukkan bahwa aplikasi ini sesuai dengan kebutuhan industri saat ini dan berpotensi menjadi alat yang berguna dalam meningkatkan produktivitas tim.

