#include <iostream>
#include <thread>
#include <mutex>

/*  KEDUA VARIABEL MEWAKILI AKUN BANK YANG AKAN DIPROTEKSI DENGAN MUTEX */
std::mutex accountA;
std::mutex accountB;

/* FUNGSI INI MENSIMULASIKAN TRANSFER DANA KE AKUN A DARI AKUN B
	PROSES YANG TERJADI :
	- PERTAMA, MENGUNCI accountB
	- KEMUDIAN, TIDUR SELAMA 50 MILISECOND
	- SETELAH ITU, MENGUNCI accountA

*/
void transferToA() {
    std::lock_guard<std::mutex> lockB(accountB);
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    std::lock_guard<std::mutex> lockA(accountA);
    std::cout << "Transfer to A completed\n";
}
/* FUNGSI INI MENSIMULASIKAN TRANSFER DANA KE AKUN B DARI AKUN A
	PROSES YANG TERJADI :
	- PERTAMA, MENGUNCI accountA
	- KEMUDIAN, TIDUR SELAMA 50 MILISECOND
	- SETELAH ITU, MENGUNCI accountB
*/
void transferToB() {
    std::lock_guard<std::mutex> lockA(accountA);
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    std::lock_guard<std::mutex> lockB(accountB);
	std::cout << "Check";
    std::cout << "Transfer to B completed\n";
}
/* FUNGSI INI ADALAH SOLUSI UNTUK MENGATASI DEADLOCK DENGAN CARA :
	- Mengunci kedua akun secara bersamaan menggunakan std::lock(accountA, accountB), yang memastikan kedua mutex (accountA dan accountB) dikunci secara atomik dan menghindari deadlock.
	- Setelah kedua akun terkunci, mutex diadopsi oleh std::lock_guard untuk memastikan keduanya dilepaskan dengan benar.

*/

void transferSafely() {
    std::lock(accountA, accountB);
    std::lock_guard<std::mutex> lockA(accountA, std::adopt_lock);
    std::lock_guard<std::mutex> lockB(accountB, std::adopt_lock);
    std::cout << "Safe transfer completed\n";
}

int main() {
    transferSafely();
    std::thread t1(transferToA);
    std::thread t2(transferToB);
    
    t1.join();
    t2.join();
    
    

    return 0;
}

