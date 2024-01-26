import { useEffect, useState } from 'react'
import './App.css'

import io from 'socket.io-client'
import { nanoid } from 'nanoid'

// no dotenv
const socket = io.connect('http://localhost:8080')

function App() {

  const [message, setMessage] = useState('')
  const [chat, setchat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault()
    let sts = socket.emit('chat', { message, id: nanoid() })
    console.log("status ",sts);
    setMessage('')
  }

  useEffect(() => {
    socket.on('chat', (payload) => {
      console.log(payload);
      if (chat.length === 0) {
        setchat([payload])
      } else {
        setchat([...chat, payload])
      }
    })
  }, [chat])

  return (
    <>
      <h1>Chatty App </h1>
      {chat.map((payload, index) => {
        return (
          <div key={index}>
            <p>{payload.message}</p>
          </div>
        )
      })}
      <form onSubmit={sendChat}>
        <input type="text" name="chat" id="chat" placeholder='send text ' value={message} onChange={e => { setMessage(e.target.value) }} />
        <input type="submit" value="Send" />
      </form>
    </>
  )
}

export default App
