import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const user = false

io.use((socket,next)=>{
  if(user) next()
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // socket.emit('welcome',`Welcome to the server `);
  // socket.broadcast.emit("welcome", ` ${socket.id} joined the server , `);


  socket.on("message", ({ message, room }) => {

    console.log(message, room);
    // socket.broadcast.emit('receive-message', data);
    io.to(room).emit('receive-message', message);

  })

  socket.on("join-room", (roomName) => {

    socket.join(roomName)
    console.log(`a User has Joined room : ${roomName}`)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});