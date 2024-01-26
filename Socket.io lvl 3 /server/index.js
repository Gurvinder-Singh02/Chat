import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

import { addUser, removeUser, getUser, getUsersInRoom } from './users.js'
import {router} from './router.js';


const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


app.use(cors());
app.use(router);



io.on('connect', (socket) => {
  socket.on('join', ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room });


    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user?.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  });

  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 8000, () => console.log(`Server has started. on port ${process.env.PORT || 8000}`));