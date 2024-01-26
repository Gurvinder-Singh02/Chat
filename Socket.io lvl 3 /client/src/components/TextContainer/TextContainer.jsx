import React from 'react';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
    </div>
    {
      users
        ? (
          <div className='pl-3' >
            <h1>People currently chatting:</h1>
            <div className="">
              <h2>
                {users.map(({ name }) => (

                  <div key={name} className="activeItem flex items-center pl-2 gap-2 ">
                    <i className=" text-[8px] fa-solid fa-circle"></i>
                    {name}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;