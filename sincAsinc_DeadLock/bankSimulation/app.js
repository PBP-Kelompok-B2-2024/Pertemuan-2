const express = require('express');
const path = require('path');
const app = express();

let accountLockA = false;
let accountLockB = false;

let scheduledTransactions = [];
let completedTransactions = [];

// Fungsi untuk mengunci akun
function lockAccount(account) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (account === 'A') {
                if (accountLockA) {
                    reject('Akun 1 terkunci!');
                } else {
                    accountLockA = true;
                    resolve('Akun 1 terkunci.');
                }
            } else if (account === 'B') {
                if (accountLockB) {
                    reject('Akun 2 terkunci!');
                } else {
                    accountLockB = true;
                    resolve('Akun 2 terkunci.');
                }
            }
        }, 0);
    });
}

// Fungsi untuk membuka akun
function unlockAccount(account) {
    if (account === 'A') {
        accountLockA = false;
    } else if (account === 'B') {
        accountLockB = false;
    }
}

// Fungsi untuk menjadwalkan transaksi dan menambahkannya ke array
function scheduleTransaction(accountFrom, accountTo, scheduleTime, res) {
    const now = new Date();
    const transactionTime = new Date(scheduleTime);

    const timeDifference = transactionTime - now;

    if (timeDifference <= 0) {
        res.json({ message: "Waktu transaksi harus di masa depan!" });
        return;
    }

    // Menyimpan transaksi dalam array
    scheduledTransactions.push({
        accountFrom,
        accountTo,
        transactionTime,
    });

    console.log(`Transaksi dari Akun ${accountFrom} ke Akun ${accountTo} dijadwalkan pada ${transactionTime.toLocaleTimeString()}`);

    res.json({
        message: `Transfer dari Akun ${accountFrom} ke Akun ${accountTo} dijadwalkan pada ${transactionTime.toLocaleTimeString()}`,
    });
}

// Fungsi untuk mengeksekusi transaksi yang telah dijadwalkan
function executeTransactions() {
    const now = new Date();

    // Loop melalui semua transaksi yang sudah waktunya dieksekusi
    scheduledTransactions = scheduledTransactions.filter(async (transaction) => {
        if (transaction.transactionTime <= now) {
            try {
                await lockAccount(transaction.accountFrom);
                console.log(`Akun ${transaction.accountFrom} terkunci, menunggu untuk mengunci Akun ${transaction.accountTo}...`);

                // Simulasi penundaan transfer
                setTimeout(async () => {
                    try {
                        await lockAccount(transaction.accountTo);
                        console.log(`Transfer dari Akun ${transaction.accountFrom} ke Akun ${transaction.accountTo} berhasil`);

                        // Tambahkan transaksi ke daftar yang telah selesai
                        completedTransactions.push({
                            accountFrom: transaction.accountFrom,
                            accountTo: transaction.accountTo,
                            transactionTime: transaction.transactionTime.toLocaleTimeString(),
                            status: 'completed',
                        });

                        unlockAccount(transaction.accountTo);
                    } catch (err) {
                        console.log(err);
                    }
                    unlockAccount(transaction.accountFrom);
                }, 1000);

                return false; // Transaksi dieksekusi, jadi keluarkan dari array
            } catch (err) {
                console.log(err);
            }
        }

        return true; // Simpan transaksi dalam array jika belum waktunya
    });
}

// Route untuk transaksi dari Akun 1 ke Akun 2 pada waktu yang ditentukan
app.get('/transferAtoB', (req, res) => {
    const scheduleTime = req.query.time; // Waktu di-set oleh pengguna, contoh: '2024-09-12T14:50:00'
    scheduleTransaction('A', 'B', scheduleTime, res);
});

// Route untuk transaksi dari Akun 2 ke Akun 1 pada waktu yang ditentukan
app.get('/transferBtoA', (req, res) => {
    const scheduleTime = req.query.time; // Waktu di-set oleh pengguna
    scheduleTransaction('B', 'A', scheduleTime, res);
});

// API untuk mendapatkan daftar transaksi yang dijadwalkan dan yang telah selesai
app.get('/transactions', (req, res) => {
    res.json({
        scheduledTransactions: scheduledTransactions.map((transaction) => ({
            accountFrom: transaction.accountFrom,
            accountTo: transaction.accountTo,
            transactionTime: transaction.transactionTime.toLocaleTimeString(),
        })),
        completedTransactions,
    });
});

// Interval untuk mengecek dan mengeksekusi transaksi setiap detik
setInterval(executeTransactions, 1000);

// Melayani file HTML
app.use(express.static(path.join(__dirname, 'public')));

// Tambahkan route untuk serve file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Transaction_Simulation.html'));
});

// Mulai server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
