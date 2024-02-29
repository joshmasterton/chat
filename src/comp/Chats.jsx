/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import getChats from '../chats/getChats';
import getMessages from '../chats/getMessages';
import socket from '../socket/socket';
import Loading from './Loading';
import '../style/Chats.scss';

function Chats({
  chats,
  user,
  setChats,
  setUser,
  clientURL,
  setPopupMessages,
}) {
  // Loading
  const [loading, setLoading] = useState(true);

  // Get all chats and store in state
  const fetchChats = async () => {
    setTimeout(async () => {
      // Get all chat groups
      const allChats = await getChats(
        `${clientURL}getChats`,
        setUser,
        setPopupMessages,
      );
      if (allChats[0]) {
        const chatGroupWithMessageCount = await Promise.all(allChats.map(async (chatGroup) => {
          // Get messages from chat group
          const allMessages = await getMessages(
            `${clientURL}getMessages`,
            setUser,
            chatGroup.chat_group_id,
            setPopupMessages,
          );

          // Get all users in group chat
          if (allMessages[0]) {
            // Add numbers of users in group
            const getUsernamesFromGroup = await Promise.all(
              allMessages.map((message) => message.username),
            );

            // Add numbers of users in group
            const newUsersFromGroup = await Promise.all(getUsernamesFromGroup.filter(
              (elem, index, self) => index === self.indexOf(elem),
            ));

            // Set chat_group amount of messages in group
            return {
              ...chatGroup,
              messagesInChat: allMessages.length,
              chatGroupPrivacy: chatGroup.chat_group_privacy,
              numberOfUsers: newUsersFromGroup.length,
              lastMessage: allMessages[allMessages.length - 1].content,
            };
          }
          return {
            ...chatGroup,
            messagesInChat: allMessages.length,
            chatGroupPrivacy: chatGroup.chat_group_privacy,
            numberOfUsers: 0,
            lastMessage: null,
          };
        }));

        // Close loading return results
        setLoading(false);
        return setChats(chatGroupWithMessageCount);
      }

      // Close loading and return null
      setLoading(false);
      return setChats([]);
    }, 150);
  };

  // Get all chats
  useEffect(() => {
    // Trigger fetch
    setLoading(true);
    fetchChats();
  }, []);

  // Socket event listener
  useEffect(() => {
    // Get chats for user
    socket.on('getChats', async () => {
      await fetchChats();
      console.log('get chats');
    });

    // On connect or reconnect
    socket.on('initialConnect', () => {
      socket.emit('sendChats');
      console.log('user is connected');
    });

    // Cleanup socket listeners
    return () => {
      socket.off('getChats');
    };
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

  // Get friend username for title
  const getGroupTitle = (obj) => {
    if (obj.chat_group_privacy) {
      if (obj.chat_group_friend_one === user.username) {
        return obj.chat_group_friend_two;
      }
      return obj.chat_group_friend_one;
    }
    return obj.chat_group_name;
  };

  // Render chats
  return (
    <main
      id="chats"
      style={loading ? { height: '100%' } : { height: 'auto' }}
    >
      <h1>Chats</h1>
      {/* <AddChat
        clientURL={clientURL}
        setUser={setUser}
        setPopupMessages={setPopupMessages}
      /> */}
      {loading ? <Loading /> : chats.map((obj) => (
        <Link
          key={obj.chat_group_id}
          to={`/chat/${obj.chat_group_id}`}
        >
          <div>
            <div>
              <h2>
                {getGroupTitle(obj)}
              </h2>
              <div>
                {obj.lastMessage
                  ? `${obj.lastMessage.length > 20
                    ? `${obj.lastMessage?.slice(0, 20)}...`
                    : obj.lastMessage}`
                  : 'No Messages'}
              </div>
            </div>
            <div
              style={{
                color: `${obj.chatGroupPrivacy
                  ? 'rgb(44, 27, 198)'
                  : 'rgba(30, 229, 37, 1)'}`,
              }}
            >
              {obj.chatGroupPrivacy ? 'Private' : 'Public'}
            </div>
            <footer>
              <div>
                <div>
                  {obj.messagesInChat ?? 0}
                </div>
                <RiMessage3Fill />
              </div>
              <div>
                <div>
                  {obj.chatGroupPrivacy ? 2 : obj.numberOfUsers ?? 0}
                </div>
                <FaUsers />
              </div>
            </footer>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Chats;
