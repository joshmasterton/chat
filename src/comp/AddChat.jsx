/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import createPublicChat from '../chats/createPublicChat';
import '../style/AddChat.scss';

function AddChat({
  setUser,
  clientURL,
  setPopupMessages,
}) {
  // Location
  const navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(false);

  // Add new public chat
  const onAddPublicChat = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      // Create new chat group
      const createChatFetch = await createPublicChat(
        `${clientURL}createPublicChat`,
        setUser,
        setPopupMessages,
      );

      if (createChatFetch.chatGroupId) {
        return navigate(`/chat/${createChatFetch.chatGroupId}`);
      }
      setLoading(false);
      return null;
    }, 150);
  };

  // Render AddChat
  return (
    <div id="addChat">
      <button
        type="button"
        onClick={(e) => onAddPublicChat(e)}
      >
        <div>New Public Chat</div>
        <div>
          {loading ? <Loading /> : <IoAdd />}
        </div>
      </button>
    </div>
  );
}

export default AddChat;
