/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';
import getMessages from '../chats/getMessages';
import getChat from '../chats/getChat';
import '../style/Chat.scss';

function Chat({
  bottomRef,
  user,
  clientURL,
  setUser,
  messages,
  setMessages,
  setPopupMessages,
}) {
  // Location
  const location = useLocation();

  // Group chat variable
  const [groupChat, setGroupChat] = useState({});

  // Loading
  const [loading, setLoading] = useState(false);

  // Get all messages in group_chat
  useEffect(() => {
    // Get all messages and store in state
    const fetchMessages = async () => {
      setLoading(true);
      setTimeout(async () => {
        const allChats = await getMessages(
          `${clientURL}getMessages`,
          setUser,
          location.pathname.slice(6),
          setPopupMessages,
        );
        const chatGroupFetch = await getChat(
          `${clientURL}getChat?id=${location.pathname.slice(6)}`,
          setUser,
          setPopupMessages,
        );
        if (allChats[0]) {
          setLoading(false);
          setGroupChat(chatGroupFetch[0]);
          return setMessages(allChats);
        }
        if (chatGroupFetch[0]) {
          setLoading(false);
          setGroupChat(chatGroupFetch[0]);
        }
        setLoading(false);
        return setMessages([]);
      }, 1000);
    };

    // Trigger fetch
    fetchMessages();
  }, []);

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
  }, [messages]);

  // Render Contacts
  return (
    <main
      id="chat"
      style={loading ? { height: '100%' } : { height: 'auto' }}
    >
      {loading ? null : (
        <header>
          <h1>{groupChat?.chat_group_name}</h1>
          <h2>{new Date(groupChat?.created_on).toLocaleString()}</h2>
        </header>
      )}
      {loading ? <Loading /> : messages.map((obj) => (
        <div
          key={obj.chat_id}
          className={user === obj.username ? 'message user' : 'message'}
        >
          <div>
            <div>
              {obj.content}
            </div>
          </div>
          <div>
            <h2 className="chatUsername">
              {obj.username}
            </h2>
            <div>
              {new Date(obj?.created_on).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      <p id="bottomRef" ref={bottomRef} />
    </main>
  );
}

export default Chat;
