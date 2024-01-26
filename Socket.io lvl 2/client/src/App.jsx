import React, { useEffect, useMemo, useState } from 'react'

import { io } from 'socket.io-client'


import './App.css'

const App = () => {

  const socket = useMemo(() => io('http://localhost:3000'), [])

  // const socket = io('http://localhost:3000')

  let [message, setMessage] = useState('')
  let [messages, setMessages] = useState([ ])
  let [room, setRoom] = useState('')
  let [socketId, setSocketId] = useState('')

  const [roomName, setRoomName] = useState('')


  const handelSubmit = (e) => {

    e.preventDefault();

    socket.emit('message', { message, room })

    setMessage('')
    // setRoom('')
  };

  const handelJoinRoom = (e) => {

    e.preventDefault();
    socket.emit('join-room', roomName)
    setRoomName("")
    
  };

  useEffect(() => {

    socket.on('connect', () => {
      setSocketId(socket.id)
      console.log('connected', socket.id)
    })

    socket.on('receive-message', (data) => {
      setMessages((messages)=>[...messages,data])
    })

    socket.on('welcome', (s) => {
      console.log(s)
    })

    return () => {
      socket.disconnect()
    };

  }, [])

  return (
    <div>
      <h2>Welcome to the server</h2>
      {socketId}

      <form onSubmit={handelJoinRoom} >
      <input placeholder='RoomName' type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} name="roomName" id="roomName" />
      <button type="submit"  > Join </button>
      </form>

      <form onSubmit={handelSubmit}>
        <input placeholder='Name' type="text" value={message} onChange={(e) => setMessage(e.target.value)} name="message" id="message" />
        <input placeholder='Room' type="text" value={room} onChange={(e) => setRoom(e.target.value)} name="room" id="room" />
        <button type="submit" value="Send" > Submit </button>
      </form>

      <ul>
        {messages.map((msg, index) => (<li key={index} > {msg} </li>
        ))}
      </ul>
    </div>
  )
}

export default App