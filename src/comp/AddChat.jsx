/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import Loading from './Loading';
import getChats from '../chats/getChats';
import createChat from '../chats/createChat';
import '../style/AddChat.scss';

function AddChat({
  setIsInputFocused,
  setPopupMessages,
  setUser,
  clientURL,
  setChats,
}) {
  // Add chat details
  const [groupName, setGroupName] = useState('');

  // Loading
  const [loading, setLoading] = useState(false);

  // On AddChat button click
  const onSubmitChat = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      // Create new chat group
      await createChat(
        `${clientURL}createChat`,
        groupName,
        setUser,
        setPopupMessages,
      );
      setLoading(false);
      setGroupName('');
      // Get all chats and store in state
      const allChats = await getChats(
        `${clientURL}getChats`,
        setUser,
        setPopupMessages,
      );
      if (allChats[0]) setChats(allChats);
    }, 100);
  };

  // Render AddChat
  return (
    <div id="addChat">
      <form
        method="POST"
        action="/"
      >
        <label htmlFor="chatGroupName">
          <div>Chat Group Name</div>
          <input
            id="chatGroupName"
            placeholder="Add Group Chat Name..."
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
            type="text"
          />
        </label>
        <button
          type="submit"
          aria-label="Add Chat"
          onClick={(e) => onSubmitChat(e)}
        >
          {loading ? <Loading /> : <IoAdd />}
        </button>
      </form>
    </div>
  );
}

export default AddChat;
