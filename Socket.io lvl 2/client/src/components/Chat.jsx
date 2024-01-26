import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { io } from 'socket.io-client';

let   socket ;
const Chat = () => {
    const location = useLocation();
    const { username, room } = location.state;
    // const ENDPOINT = 'localhost:4000';



    useEffect(() => {
        console.log(socket);
        socket = io('localhost:4000');
        socket.emit('join', { username, room });
        console.log(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>{username}</h1>
            <h1>{room}</h1>
        </div>
    );
};

export default Chat;
