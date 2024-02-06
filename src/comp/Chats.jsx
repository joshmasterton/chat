/* eslint-disable react/prop-types */
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import '../style/Chats.scss';

function Chats() {
  // Chat groups
  const chats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <main id="chats">
      <h1>Chats</h1>
      {chats.map((obj) => (
        <Link
          key={obj}
          to="/chat"
        >
          <FaUser />
          <div>
            <h2>Chat group name</h2>
            <div>
              Last message here
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Chats;
