import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/chat', { state: { username, room } });

    };

    return (
        <div>
            <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
            <input type="text" value={room} onChange={handleRoomChange} placeholder="Room" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Join