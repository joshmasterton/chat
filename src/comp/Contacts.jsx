/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import Loading from './Loading';
import MovingBackground from './MovingBackground';
import createChat from '../chats/createChat';
import getContacts from '../auth/getUsers';
import getFriendship from '../friends/getFriendship';
import '../style/Contacts.scss';

function Contacts({
  user,
  setUser,
  clientURL,
  contacts,
  setContacts,
  setPopupMessages,
  setIsInputFocused,
}) {
  // Chat groups
  const [findUser, setFindUser] = useState('');

  // Location
  const navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState([]);

  // Set friendship status with users
  const getFriendshipStatus = async (contact) => {
    const friendship = await getFriendship(
      `${clientURL}getFriendship`,
      user?.username,
      contact?.username,
      setUser,
      setPopupMessages,
    );

    // Check friendship to see if its accepted by both parties
    if (friendship[0]) {
      if (friendship[0].friend_one_accepted
        && friendship[0].friend_two_accepted
      ) {
        return 2;
      }
      if (friendship[0].friend_one_accepted
        && friendship[0].friend_one_username === user.username) {
        return 1;
      }
      if (friendship[0].friend_one_accepted
        && friendship[0].friend_two_username === user.username) {
        return 1;
      }
    }
    return null;
  };

  // Get all users
  useEffect(() => {
    // Get all users and store in state
    const fetchUsers = async () => {
      setLoading(true);
      setTimeout(async () => {
        const allUsers = await getContacts(
          `${clientURL}getUsers`,
          user,
          setUser,
          setPopupMessages,
        );
        // Sort and set state of all users
        if (allUsers[0]) {
          const filteredContacts = await allUsers.filter((obj) => {
            const findUserLower = findUser.toLowerCase();
            return obj.usernamelowercase.includes(findUserLower);
          });
          // Fetch friendship status
          const contactsWithStatus = await Promise.all(filteredContacts.map(async (contact) => {
            const friendshipStatus = await getFriendshipStatus(contact);
            return { ...contact, friendStatus: friendshipStatus };
          }));

          // Set contacts
          setContacts(contactsWithStatus.sort((a, b) => b.friendStatus - a.friendStatus));

          setLoading(false);
        }
        setLoading(false);
      }, 150);
    };

    // Trigger fetch
    fetchUsers();
  }, [findUser]);

  // On AddChat button click
  const onSubmitChat = async (e, contact) => {
    e.preventDefault();
    setLoadingChat(contact.user_id);
    setTimeout(async () => {
      // Create new chat group
      const createChatFetch = await createChat(
        `${clientURL}createChat`,
        `${user.username}${contact.username}`,
        true,
        user.username,
        contact.username,
        setUser,
        setPopupMessages,
      );
      if (createChatFetch.chatGroupId) {
        return navigate(`/chat/${createChatFetch.chatGroupId}`);
      }
      setLoadingChat(false);
      return null;
    }, 100);
  };

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [findUser]);

  // Get color for friendship status
  const getFriendshipColor = (friendStatus) => {
    if (friendStatus === 1) {
      return `conic-gradient(
        rgba(224, 128, 25, 1),
        rgba(224, 128, 25, 0.25),
        rgba(224, 128, 25, 0.25),
        rgba(224, 128, 25, 1)
      )`;
    }
    if (friendStatus === 2) {
      return `conic-gradient(
        rgba(30, 229, 37, 1),
        rgba(30, 229, 37, 0.25),
        rgba(30, 229, 37, 0.25),
        rgba(30, 229, 37, 1)
      )`;
    }
    return null;
  };

  // Get color for friendship status
  const getFriendshipColorFill = (friendStatus) => {
    if (friendStatus === 1) {
      return 'rgba(224, 128, 25, 1)';
    }
    if (friendStatus === 2) {
      return 'rgba(30, 229, 37, 1)';
    }
    return null;
  };

  // Render Contacts
  return (
    <main
      id="contacts"
      style={loading ? { height: '100%' } : { height: 'auto' }}
    >
      <h1>Contacts</h1>
      <div
        id="findNav"
      >
        <form method="POST" action="/">
          <input
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={(e) => setFindUser(e.target.value)}
            placeholder="Find user..."
          />
        </form>
      </div>
      {loading ? <Loading /> : contacts.map((obj, index) => (
        <div
          className="contact"
          key={`${index.toString()}`}
        >
          <MovingBackground
            getFriendshipColor={getFriendshipColor}
            friendStatus={obj.friendStatus}
            position="absolute"
            width="400rem"
            height="400rem"
            index={index}
            borderRadius="0"
          />
          <div>
            <Link
              to={`/contact/${obj.username}`}
            >
              <h2
                style={{ color: getFriendshipColorFill(obj.friendStatus) }}
              >
                {obj.username}
              </h2>
              <div
                style={{ color: getFriendshipColorFill(obj.friendStatus) }}
              >
                {new Date(obj?.created_on).toLocaleString()}
              </div>
            </Link>
            <button
              type="button"
              aria-label="addChat"
              onClick={(e) => onSubmitChat(e, obj)}
            >
              {loadingChat === obj?.user_id
                ? <Loading />
                : <RiMessage3Fill fill={getFriendshipColorFill(obj.friendStatus) ?? 'white'} />}
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Contacts;
