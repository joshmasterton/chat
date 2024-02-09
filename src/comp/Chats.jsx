/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Chats.scss';

function Chats() {
  // Chat groups
  const chats = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
  ];

  // Scroll to bottom
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Render chats
  return (
    <main id="chats">
      <h1>Chats</h1>
      {chats.map((obj) => (
        <Link
          key={obj}
          to="/chat"
        >
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
