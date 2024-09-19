let formIsBroken = false; // Status global untuk memantau apakah form rusak

$(document).ready(function() {
    // Inisialisasi DataTable untuk inventoryTable
    const table = $('#inventoryTable').DataTable();

    // Exception Handling: Tambah Barang ke Inventaris
    // document.getElementById('addItemBtn').addEventListener('click', function() {
    //     const itemName = document.getElementById('itemName').value;
    //     const itemStock = parseInt(document.getElementById('itemStock').value);
    //     const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    //     const inventoryResult = document.getElementById('inventoryResult');
    //     const inventoryError = document.getElementById('inventoryError');

    //     inventoryResult.textContent = '';
    //     inventoryError.textContent = '';

    //     // Tambahkan barang ke tabel
    //     if (!itemName) {
    //         throw new Error('Nama barang tidak boleh kosong.');
    //     }
    //     if (isNaN(itemStock) || itemStock <= 0) {
    //         throw new Error('Stok barang harus berupa angka positif.');
    //     }
    //     if (isNaN(itemPrice) || itemPrice <= 0) {
    //         throw new Error('Harga barang harus berupa angka positif.');
    //     }
    //     table.row.add([itemName, itemStock, itemPrice]).draw();

    //     // try {
    //     //     if (!itemName) {
    //     //         throw new Error('Nama barang tidak boleh kosong.');
    //     //     }
    //     //     if (isNaN(itemStock) || itemStock <= 0) {
    //     //         throw new Error('Stok barang harus berupa angka positif.');
    //     //     }
    //     //     if (isNaN(itemPrice) || itemPrice <= 0) {
    //     //         throw new Error('Harga barang harus berupa angka positif.');
    //     //     }

    //     //     // Tambahkan barang ke tabel
    //     //     table.row.add([itemName, itemStock, itemPrice]).draw();

    //     //     // Menampilkan pesan sukses
    //     //     inventoryResult.textContent = `Barang berhasil ditambahkan: ${itemName} (Stok: ${itemStock}, Harga: ${itemPrice})`;

    //     // } catch (error) {
    //     //     inventoryError.textContent = `Error: ${error.message}`;
    //     // }
    // });

    // Simulasi Tambah Barang dengan Potensi Error
    document.getElementById('addItemBtn').addEventListener('click', function() {
        const itemName = document.getElementById('itemName').value;
        const itemStock = parseInt(document.getElementById('itemStock').value);
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        const inventoryResult = document.getElementById('inventoryResult');
        const inventoryError = document.getElementById('inventoryError');

        inventoryResult.textContent = '';
        inventoryError.textContent = '';

        // Jika form sudah rusak, stop fungsi dan beri pesan error
        if (formIsBroken) {
            console.error('Form sudah rusak karena error sebelumnya.');
            inventoryError.textContent = 'Form sudah rusak! Silakan refresh halaman.';
            return;
        }

        try {
            if (!itemName) {
                // Error kritis, yang akan merusak form jika terjadi
                formIsBroken = true;  // Merusak form
                throw new Error('Nama barang tidak boleh kosong. Form rusak!');
            }
            if (isNaN(itemStock) || itemStock <= 0) {
                throw new Error('Stok barang harus berupa angka positif.');
            }
            if (isNaN(itemPrice) || itemPrice <= 0) {
                throw new Error('Harga barang harus berupa angka positif.');
            }

            // Tambah barang ke tabel jika semua input valid
            table.row.add([itemName, itemStock, itemPrice]).draw();
            inventoryResult.textContent = `Barang berhasil ditambahkan: ${itemName} (Stok: ${itemStock}, Harga: ${itemPrice})`;
        } catch (error) {
            // Tampilkan error di UI dan console
            console.error('Error: ', error.message);
            inventoryError.textContent = `Error: ${error.message}`;
        }
    });

    // Exception Handling: Ambil Data dari API
    document.getElementById('fetchItemBtn').addEventListener('click', async function() {
        const apiData = document.getElementById('apiData');
        const apiError = document.getElementById('apiError');

        apiData.textContent = '';
        apiError.textContent = '';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

            if (!response.ok) {
                throw new Error('Gagal mengambil data dari API');
            }

            const data = await response.json();
            apiData.textContent = `Data Barang: ${data.title}`;
        } catch (error) {
            apiError.textContent = `Error: ${error.message}`;
        }
    });

    // Exception Handling: Simulasi Error
    document.getElementById('simulateErrorBtn').addEventListener('click', function() {
        const errorResult = document.getElementById('errorResult');

        errorResult.textContent = '';

        try {
            // Simulasi error
            throw new Error('Terjadi kesalahan sistem!');
        } catch (error) {
            errorResult.textContent = `Simulasi Error: ${error.message}`;
        }
    });
});
