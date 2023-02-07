const app = require('./app');
const http = require('http');
const {WebSocket} = require("ws");
const PORT = require('./utils/config').PORT;
const server = http.createServer(app);



const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('new client connected');
    ws.send('Welcome Message');

    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

