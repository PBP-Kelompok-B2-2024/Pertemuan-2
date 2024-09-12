const ws = new WebSocket('ws://localhost:3000');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesDiv = document.getElementById('messages');
const translateModal = document.getElementById('translateModal');
const currentUsernameElement = document.getElementById('currentUsername');
let currentMessageElement;

let username = '';  // Variable untuk menyimpan nama pengguna
let country = '';   // Variable untuk menyimpan negara pengguna
let countryFlag = ''; // URL flag image
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const usernameSubmitBtn = document.getElementById('usernameSubmitBtn');
const countrySelect = document.getElementById('countrySelect');

// Warna unik untuk setiap username
const userColors = {};
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#33FFF0', '#A633FF', '#FFC533', '#33FFA5'];

// Fungsi untuk mengambil warna username (berdasarkan urutan)
function getUsernameColor(username) {
    if (!userColors[username]) {
        const colorIndex = Object.keys(userColors).length % colors.length;
        userColors[username] = colors[colorIndex];
    }
    return userColors[username];
}

// Saat pengguna submit nama
usernameSubmitBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    const selectedCountry = countrySelect.options[countrySelect.selectedIndex];
    country = selectedCountry.text;
    countryFlag = selectedCountry.getAttribute('data-flag');

    if (username && country) {
        usernameModal.style.display = 'none';  // Tutup modal setelah nama dan negara diisi
        currentUsernameElement.innerHTML = `Username: ${username} <img src="${countryFlag}" style="width: 20px; height: 15px;" title="${country}">`;  // Tampilkan username dan bendera
    } else {
        alert('Please enter your name and select your country.');
    }
});

// Jika pengguna belum memasukkan nama, tampilkan modal
if (!username) {
    usernameModal.style.display = 'block';
}

// Send message to WebSocket server with username
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && username && countryFlag) {
        console.log(`Sending countryFlag: ${countryFlag}`);  // Debug: log flag yang dikirim
        const messageData = JSON.stringify({ username, message, country, countryFlag });
        ws.send(messageData);
        messageInput.value = '';
    }
});

// Listen for messages from WebSocket server
// Listen for messages from WebSocket server
ws.onmessage = async (event) => {
    let receivedData;

    if (event.data instanceof Blob) {
        receivedData = await event.data.text();  // Konversi Blob menjadi string
    } else {
        receivedData = event.data;
    }

    let parsedMessage;

    try {
        parsedMessage = JSON.parse(receivedData);
        console.log(parsedMessage);
    } catch (error) {
        console.error('Invalid message format', error);
        return;
    }

    const { username: receivedUsername, message, countryFlag: receivedCountryFlag, country: receivedCountry } = parsedMessage;

    // Tentukan flag fallback jika `receivedCountryFlag` tidak tersedia
    const flagToShow = receivedCountryFlag ? receivedCountryFlag : 'https://flagicons.lipis.dev/flags/4x3/un.svg';  // Gunakan flag PBB sebagai fallback

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    const messageTextElement = document.createElement('span');
    messageTextElement.innerHTML = `<img src="${flagToShow}" style="width: 15px; height: 12px;" title="${receivedCountry || 'Unknown Country'}"> ${receivedUsername}: ${message}`;
    messageTextElement.style.color = getUsernameColor(receivedUsername);  // Warna unik untuk setiap username

    const translateBtn = document.createElement('button');
    translateBtn.textContent = 'Translate';
    translateBtn.addEventListener('click', () => {
        currentMessageElement = messageTextElement;
        translateModal.style.display = 'block';  // Tampilkan modal terjemahan
    });

    messageElement.appendChild(messageTextElement);  // Tambah teks pesan
    messageElement.appendChild(translateBtn);  // Tambah tombol terjemahan
    messagesDiv.appendChild(messageElement);  // Tambah ke chat container
};




// Handle translation selection
translateModal.addEventListener('click', (event) => {
    if (event.target.id === 'translateBtn') {
        const sourceLang = document.getElementById('sourceLang').value;
        const targetLang = document.getElementById('targetLang').value;
        const originalText = currentMessageElement.textContent;
        translateMessage(originalText, sourceLang, targetLang);
        translateModal.style.display = 'none';
    } else if (event.target.getAttribute('data-lang') === 'close') {
        translateModal.style.display = 'none';
    }
});

// Function to translate message (default source language to en)
async function translateMessage(text, sourceLang, targetLang) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`);
    const data = await response.json();
    const translatedText = data.responseData.translatedText;

    const translatedMessageElement = document.createElement('div');
    translatedMessageElement.classList.add('translated-message');
    translatedMessageElement.textContent = `Translated (${sourceLang} -> ${targetLang}): ${translatedText}`;

    currentMessageElement.appendChild(translatedMessageElement);
}
