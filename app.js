const WebSocket = require('ws');

const port = process.env.PORT || 8080;  // Use Heroku's assigned port or 8080 for local development

const wss = new WebSocket.Server({ port });

function broadcastToOthers(message, sender) {
    wss.clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
        }
    });
}

wss.on('connection', (ws) => {
    console.log('New client connected.');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        broadcastToOthers(message, ws);
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

console.log(`WebSocket server is running on port ${port}`);
