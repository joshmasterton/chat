/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import '../style/Chat.scss';

function Chat({ bottomRef }) {
  // Message data
  const messages = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
  ];

  // Scroll to bottom function
  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  };

  // Scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Render Contacts
  return (
    <main id="chat">
      <h1>Chat</h1>
      {messages.map((obj) => (
        <div
          key={obj}
          className="message"
        >
          <div>
            <div>
              I dont know what to say but if i
              say anything to add to this i will
            </div>
          </div>
          <div>
            <h2 className="chatUsername">
              Username
            </h2>
            <div>
              - 00/00/0000 00:00
            </div>
          </div>
        </div>
      ))}
      <p id="bottomRef" ref={bottomRef} />
    </main>
  );
}

export default Chat;
