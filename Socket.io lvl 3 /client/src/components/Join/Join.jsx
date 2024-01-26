import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [showJoin, setShow] = useState(true);
  const navigate = useNavigate();


  const handleKeyPressName = (e) => {
    if(name === '') return;
    if (e.key === 'Enter') {
      e.preventDefault();

      setShow(false);
    }
  }

  const handleKeyPressJoin = (e) => {
    if(room === '') return;
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate('/chat', { state: { name, room } });
    }
  }

  return (

    <div className="w-screen h-screen flex  items-center justify-center" >
      <div className='fixed px-4 py-1 bg-black text-white rounded-3xl top-2 left-10/2 cursor-pointer' onClick={() => { setShow(!showJoin) }} >
        Toggle
      </div>
      {showJoin ? (
        <div className="text flex flex-col border-b-4 border-black ">
          <input
            
            className=" lg:text-[45px] md:text-[30px] text-[20px] text-black text-center"
            placeholder='Enter Your Name'
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyPress={handleKeyPressName}
          />
        </div>
      ) : (
        <div className="text flex flex-col border-b-4 border-black ">
          <input
            className=" lg:text-[45px] md:text-[30px] text-[20px] text-purple text-center"
            placeholder='Enter Room Name '
            id='room'
            name='room'
            type="text"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            onKeyPress={handleKeyPressJoin}
          />
        </div>
      )}
    </div>
  );
}
