const express = require('express');

const http = require('http').createServer();
const app = express();

// Create a Socket.IO instance using the HTTP server
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

// Just like websocket its events based system 


// The first event is the connection event, which is fired when a client connects to the server
io.on('connection', (socket) => {

    //socket obj is the client socket that is connected to the server

    console.log('A user connected');

    // Chat is the custom event name 
    socket.on('chat', (message) => {

        console.log('Received message from client:', message);

        // Broadcast the message to all the clients 
        io.emit('chat',message)
    });
});


// Start the server and listen on the specified port
http.listen(8080, () => console.log(`Server listening on port: ${8080} ...`));