/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { IoClose, IoAdd } from 'react-icons/io5';

import '../style/AddChat.scss';

function AddChat({
  isAddChat,
  setIsInputFocused,
  setIsAddChat,
}) {
  // On AddChat button click
  const onSubmitChat = (e) => {
    e.preventDefault();
    setIsAddChat(false);
  };

  // Remove scroll if addChat open
  useEffect(() => {
    if (isAddChat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAddChat]);

  // Render AddChat
  return (
    <div id="addChat" className={isAddChat ? '' : 'hidden'}>
      <button
        type="button"
        aria-label="Menu off"
        onClick={() => setIsAddChat(false)}
        className={isAddChat ? '' : 'hidden'}
      />
      <form
        className={isAddChat ? '' : 'hidden'}
        method="POST"
        action="/"
      >
        <button
          type="submit"
          aria-label="close"
          onClick={(e) => onSubmitChat(e)}
        >
          <IoClose />
        </button>
        <label htmlFor="chatGroupName">
          <div>Chat Group Name</div>
          <input
            id="chatGroupName"
            placeholder="Chat Group Name"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            type="text"
          />
        </label>
        <button
          type="submit"
          aria-label="Add Chat"
          onClick={(e) => onSubmitChat(e)}
        >
          <IoAdd />
        </button>
      </form>
    </div>
  );
}

export default AddChat;
