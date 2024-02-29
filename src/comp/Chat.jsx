/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import getMessages from '../chats/getMessages';
import getChat from '../chats/getChat';
import socket from '../socket/socket';
import '../style/Chat.scss';

function Chat({
  bottomRef,
  user,
  clientURL,
  setIsChat,
  setUser,
  messages,
  setMessages,
  setPopupMessages,
}) {
  // Location
  const location = useLocation();
  const navigate = useNavigate();

  // Group chat variable
  const [groupChat, setGroupChat] = useState({});

  // Loading
  const [loading, setLoading] = useState(false);

  // Get all messages and store in state
  const fetchMessages = async () => setTimeout(async () => {
    // Get chat group
    const chatGroupFetch = await getChat(
      `${clientURL}getChat?id=${location.pathname.slice(6)}`,
      setUser,
      setPopupMessages,
    );
    if (!chatGroupFetch.err) {
      // Get messages from chat group
      const allChats = await getMessages(
        `${clientURL}getMessages`,
        setUser,
        location.pathname.slice(6),
        setPopupMessages,
      );
      if (allChats[0]) {
        setLoading(false);

        // Set group chat details
        setGroupChat(chatGroupFetch[0]);
        return setMessages(allChats);
      }
      setMessages([]);
      // If chat group exists store deatails in group chat
      if (chatGroupFetch[0]) {
        setLoading(false);
        return setGroupChat(chatGroupFetch[0]);
      }
    }
    // If no access return navigation
    setLoading(false);
    setMessages([]);
    setGroupChat({});
    navigate('/chats');
    return navigate(0);
  }, 150);

  // Get all messages in group_chat
  useEffect(() => {
    // Get chat keyboard
    setIsChat(true);

    // Trigger fetch
    setLoading(true);

    // Socket emit join chat group
    socket.emit('joinChat', location.pathname.slice(6));

    // Fetch messages
    fetchMessages();
  }, []);

  // Socket event listener
  useEffect(() => {
    // User has joined
    socket.on('userJoinedChat', (userJoinedChat) => {
      console.log(userJoinedChat);
    });

    // On connect or reconnect
    socket.on('initialConnect', () => {
      // Socket emit join chat group
      socket.emit('joinChat', location.pathname.slice(6));

      // Emit to socket for all in chat
      socket.emit('sendMessage', location.pathname.slice(6));

      console.log('user is connected');
    });

    // Get messages for user
    socket.on('getMessages', async () => {
      await fetchMessages();
      console.log('get messages');
    });

    // Cleanup socket listeners
    return () => {
      socket.off('userJoinedChat');
      socket.off('getMessages');
    };
  }, [socket]);

  // Get friend username for title
  const getGroupTitle = () => {
    if (groupChat.chat_group_privacy) {
      if (groupChat.chat_group_friend_one === user.username) {
        return <h1>{groupChat.chat_group_friend_two}</h1>;
      }
      return <h1>{groupChat.chat_group_friend_one}</h1>;
    }
    return <h1>{groupChat.chat_group_name}</h1>;
  };

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
          {getGroupTitle()}
          <p>{new Date(groupChat?.chat_group_created_on).toLocaleString()}</p>
        </header>
      )}
      {loading ? <Loading /> : messages.map((obj) => (
        <div
          key={obj.chat_id}
          className={user.username === obj.username ? 'message user' : 'message'}
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
