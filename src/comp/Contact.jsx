/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  IoPersonAddSharp,
  IoPersonRemoveSharp,
} from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import createFriendship from '../friends/createFriendship';
import createChat from '../chats/createChat';
import getContact from '../auth/getContact';
import getFriendship from '../friends/getFriendship';
import removeFriendship from '../friends/removeFriendship';
import MovingBackground from './MovingBackground';
import Loading from './Loading';
import '../style/Contact.scss';

function Contact({
  user,
  setUser,
  clientURL,
  setPopupMessages,
}) {
  // Contact
  const [contact, setContact] = useState(null);
  const [friendStatus, setFriendStatus] = useState(3);
  const [friendStatusMsg, setFriendStatusMsg] = useState('');

  // Loading
  const [loading, setLoading] = useState(true);
  const [loadingCardAdd, setLoadingCardAdd] = useState(false);
  const [loadingCardRemove, setLoadingCardRemove] = useState(false);
  const [loadingCardChat, setLoadingCardChat] = useState(false);

  // Location
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.pathname?.slice(9);

  // Get friendship
  const getFriendshipCurrent = async () => {
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
        setFriendStatusMsg('');
        return setFriendStatus(2);
      }
      if (friendship[0].friend_one_accepted
        && friendship[0].friend_one_username === user.username) {
        setFriendStatusMsg('Waiting for other person to accept');
        return setFriendStatus(1);
      }
      if (friendship[0].friend_one_accepted
        && friendship[0].friend_two_username === user.username) {
        setFriendStatusMsg('Waiting for you to accept');
        return setFriendStatus(1);
      }
    }
    setFriendStatusMsg('');
    return setFriendStatus(0);
  };

  // Get contact and store in state
  const fetchContact = async () => {
    setLoading(true);
    setTimeout(async () => {
      const getContactFetch = await getContact(
        `${clientURL}getContact?username=${username}`,
        setUser,
        setPopupMessages,
      );
      if (getContactFetch[0]) setContact(getContactFetch[0]);
      setLoading(false);
    }, 150);
  };

  // Add friend
  const addFriend = async () => {
    setLoadingCardAdd(true);
    setTimeout(async () => {
      await createFriendship(
        `${clientURL}createFriendship`,
        user?.username,
        contact?.username,
        setUser,
        setPopupMessages,
      );
      const getContactFetch = await getContact(
        `${clientURL}getContact?username=${username}`,
        setUser,
        setPopupMessages,
      );
      if (getContactFetch[0]) setContact(getContactFetch[0]);
      setLoadingCardAdd(false);
    }, 150);
  };

  // Remove friend
  const removeFriend = async () => {
    setLoadingCardRemove(true);
    setTimeout(async () => {
      await removeFriendship(
        `${clientURL}removeFriendship`,
        user?.username,
        contact?.username,
        setUser,
        setPopupMessages,
      );
      const getContactFetch = await getContact(
        `${clientURL}getContact?username=${username}`,
        setUser,
        setPopupMessages,
      );
      if (getContactFetch[0]) setContact(getContactFetch[0]);
      setLoadingCardRemove(false);
    }, 150);
  };

  // On AddChat button click
  const onSubmitChat = async (e) => {
    e.preventDefault();
    setLoadingCardChat(true);
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
      setLoadingCardChat(false);
      if (createChatFetch.chatGroupId) {
        return navigate(`/chat/${createChatFetch.chatGroupId}`);
      }
      return null;
    }, 100);
  };

  // Get contact
  useEffect(() => {
    // Trigger fetch
    fetchContact();
  }, []);

  // Get friendship
  useEffect(() => {
    getFriendshipCurrent();
  }, [contact, loading], friendStatus);

  // Get color for friendship status
  const getFriendshipColor = () => {
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
    return `conic-gradient(
      rgba(20, 20, 24, 1),
      rgba(20, 20, 24, 0.25),
      rgba(20, 20, 24, 0.25),
      rgba(20, 20, 24, 1)
    )`;
  };

  // Get color for friendship status
  const getFriendshipColorFill = () => {
    if (friendStatus === 1) {
      return 'rgba(224, 128, 25, 1)';
    }
    if (friendStatus === 2) {
      return 'rgba(30, 229, 37, 1)';
    }
    return null;
  };

  // Render Contact
  return (
    <main id="contact">
      {loading ? <Loading /> : (
        <>
          <main>
            <MovingBackground
              getFriendshipColor={getFriendshipColor}
            />
            <div>
              <div
                style={{ color: getFriendshipColorFill() }}
              >
                {contact?.username?.slice(0, 1)}
              </div>
              <button
                type="button"
                aria-label="Add"
                onClick={() => addFriend()}
              >
                {loadingCardAdd ? <Loading /> : (
                  <IoPersonAddSharp fill={getFriendshipColorFill() ?? 'white'} />
                )}
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => removeFriend()}
              >
                {loadingCardRemove ? <Loading /> : (
                  <IoPersonRemoveSharp fill={getFriendshipColorFill() ?? 'white'} />
                )}
              </button>
              <button
                type="button"
                aria-label="addChat"
                onClick={(e) => onSubmitChat(e)}
              >
                {loadingCardChat ? <Loading /> : (
                  <RiMessage3Fill fill={getFriendshipColorFill() ?? 'white'} />
                )}
              </button>
            </div>
          </main>
          <p
            style={{ color: getFriendshipColorFill() }}
          >
            {contact?.username}
          </p>
          <p
            style={{ color: getFriendshipColorFill() }}
          >
            {friendStatusMsg}
          </p>
        </>
      )}
    </main>
  );
}

export default Contact;
