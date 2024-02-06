/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa6';
import '../style/Chat.scss';

function Chat({
  bottomRef,
}) {
  // Message data
  const messages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({
        behavior: 'instant',
      });
    }, 400);
  }, []);

  // Render Contacts
  return (
    <main id="chat">
      <h1>Chat</h1>
      {messages.map((obj) => (
        <div
          key={obj}
          className={`message${obj % 2 === 0 ? 'User' : 'Contact'}`}
        >
          <div>
            <div>
              I dont know what to say but if i
              say anything to add to this i will
              say something that will make no sense
              but it will look like a sentence
            </div>
            <div>
              00/00/0000 00:00
            </div>
          </div>
          <FaUser />
        </div>
      ))}
      <div id="bottomRef" ref={bottomRef} />
    </main>
  );
}

export default Chat;
