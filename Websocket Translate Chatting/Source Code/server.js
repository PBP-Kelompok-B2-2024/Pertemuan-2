const WebSocket = require('ws');
const express = require('express');
const http = require('http');

// Setup Express server
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (for the client)
app.use(express.static('public'));

// Broadcast to all connected clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);  // Parsing pesan sebagai JSON
            const { username, message: userMessage, country, countryFlag } = parsedMessage; // Destructuring country and countryFlag
            console.log(`${username} (${country}): ${userMessage}`);
            
            // Broadcast message including country and countryFlag
            wss.broadcast(JSON.stringify({
                username,
                message: userMessage,
                country,         // Include country
                countryFlag      // Include countryFlag
            }));
        } catch (error) {
            console.error('Invalid message format', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});