const app = require('./app');
const http = require('http');
const PORT = require('./utils/config').PORT;
const server = http.createServer(app);
const {Server} = require('socket.io');

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.send('Welcome Message');

    socket.on('error', console.error);
    socket.on('message', function message(data) {
        console.log(`Message from client ${socket.id}: ${data}`);
    });

    socket.on('disconnect', () => {
        socket.disconnect();
        console.log(`Client ${socket.id} disconnected`);
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

