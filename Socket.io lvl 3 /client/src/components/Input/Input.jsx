import React from 'react';


const Input = ({ setMessage, sendMessage, message }) => (
  <form className="w-[95%] flex border p-4 rounded-3xl  bg-white z-100 fixed bottom-3 ">
    <input
      className="flex-1 border-none outline-none"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;