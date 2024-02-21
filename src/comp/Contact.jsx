/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  IoPersonAddSharp,
  IoPersonRemoveSharp,
} from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import createFriendship from '../friends/createFriendship';
import getContact from '../auth/getContact';
import getFriendship from '../friends/getFriendship';
import removeFriendship from '../friends/removeFriendship';
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
  const [friendStatus, setFriendStatus] = useState(0);
  const [friendStatusMsg, setFriendStatusMsg] = useState('');

  // Loading
  const [loading, setLoading] = useState(true);

  // Location
  const location = useLocation();
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
    }, 1000);
  };

  // Add friend
  const addFriend = async () => {
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
  };

  // Remove friend
  const removeFriend = async () => {
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
  };

  // Get contact
  useEffect(() => {
    // Trigger fetch
    fetchContact();
  }, []);

  // Get friendship
  useEffect(() => {
    getFriendshipCurrent();
  }, [contact, loading]);

  // Get color for friendship status
  const getFriendshipColor = () => {
    if (friendStatus === 1) {
      return `conic-gradient(
        rgba(212, 229, 30, 1),
        rgba(212, 229, 30, 0.25),
        rgba(212, 229, 30, 0.25),
        rgba(212, 229, 30, 1)
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
      rgba(229, 30, 30, 1),
      rgba(229, 30, 30, 0.25),
      rgba(229, 30, 30, 0.25),
      rgba(229, 30, 30, 1)                 
    )`;
  };

  // Render Contact
  return (
    <main id="contact">
      {loading ? <Loading /> : (
        <>
          <main>
            <header className="rotate">
              <div
                style={{ background: getFriendshipColor() }}
              />
            </header>
            <div>
              <div>{contact?.username?.slice(0, 1)}</div>
              <button
                type="button"
                aria-label="Add"
                onClick={() => addFriend()}
              >
                <IoPersonAddSharp />
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => removeFriend()}
              >
                <IoPersonRemoveSharp />
              </button>
            </div>
          </main>
          <p>{contact?.username}</p>
          <p>{friendStatusMsg}</p>
        </>
      )}
    </main>
  );
}

export default Contact;
