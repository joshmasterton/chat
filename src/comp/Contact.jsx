/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  IoPersonAddSharp,
  IoPersonRemoveSharp,
} from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import getContact from '../auth/getContact';
import '../style/Contact.scss';
import Loading from './Loading';

function Contact({
  setUser,
  clientURL,
  setPopupMessages,
}) {
  // Contact
  const [contact, setContact] = useState(null);

  // Loading
  const [loading, setLoading] = useState(true);

  // Location
  const location = useLocation();
  const username = location.pathname?.slice(9);

  // Get all chats
  useEffect(() => {
    // Get all chats and store in state
    const fetchChats = async () => {
      setLoading(true);
      setTimeout(async () => {
        const allUsers = await getContact(
          `${clientURL}getContact?username=${username}`,
          setUser,
          setPopupMessages,
        );
        if (allUsers[0]) setContact(allUsers[0]);
        setLoading(false);
      }, 1000);
    };

    // Trigger fetch
    fetchChats();
  }, []);

  // Render Contact
  return (
    <main id="contact">
      {loading ? <Loading /> : (
        <>
          <main>
            <header className="rotate">
              <div />
            </header>
            <div>{contact?.username?.slice(0, 1)}</div>
            <button type="button" aria-label="Add">
              <IoPersonAddSharp />
            </button>
            <button type="button" aria-label="Remove">
              <IoPersonRemoveSharp />
            </button>
          </main>
          <p>{contact?.username}</p>
        </>
      )}
    </main>
  );
}

export default Contact;
