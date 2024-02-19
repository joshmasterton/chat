/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getChats from '../chats/getChats';
import Loading from './Loading';
import AddChat from './AddChat';
import '../style/Chats.scss';

function Chats({
  chats,
  setChats,
  setUser,
  clientURL,
  setIsInputFocused,
  setPopupMessages,
}) {
  // Loading
  const [loading, setLoading] = useState(true);

  console.log(clientURL);

  // Get all chats
  useEffect(() => {
    // Get all chats and store in state
    const fetchChats = async () => {
      setLoading(true);
      setTimeout(async () => {
        const allChats = await getChats(
          `${clientURL}getChats`,
          setUser,
          setPopupMessages,
        );
        if (allChats[0]) {
          setLoading(false);
          return setChats(allChats);
        }
        setLoading(false);
        return setChats([]);
      }, 1000);
    };

    // Trigger fetch
    fetchChats();
  }, []);

  // Scroll to top
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  }, [chats]);

  // Render chats
  return (
    <main
      id="chats"
      style={loading ? { height: '100%' } : { height: 'auto' }}
    >
      <h1>Chats</h1>
      <AddChat
        setIsInputFocused={setIsInputFocused}
        setPopupMessages={setPopupMessages}
        setUser={setUser}
        setChats={setChats}
        clientURL={clientURL}
      />
      {loading ? <Loading /> : chats.map((obj) => (
        <Link
          key={obj.chat_group_id}
          to={`/chat/${obj.chat_group_id}`}
        >
          <div>
            <h2>{obj.chat_group_name}</h2>
            <div>
              {new Date(obj?.created_on).toLocaleString()}
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Chats;
