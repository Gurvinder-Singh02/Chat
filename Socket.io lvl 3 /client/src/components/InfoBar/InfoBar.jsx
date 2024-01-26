import React from 'react';

const InfoBar = ({ room }) => (
  <div className=" bg-black rounded-3xl text-white flex p-4 gap-2 justify-center items-center w-full ">
     <i className=" text-[8px] fa-solid fa-circle"></i>
       <h3>Room : {room}</h3>
  </div>
);

export default InfoBar;