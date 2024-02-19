/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import getContacts from '../auth/getUsers';
import '../style/Contacts.scss';

function Contacts({
  setUser,
  clientURL,
  findUser,
  setPopupMessages,
}) {
  // Chat groups
  const [contacts, setContacts] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Get all chats
  useEffect(() => {
    // Get all chats and store in state
    const fetchChats = async () => {
      setLoading(true);
      setTimeout(async () => {
        const allUsers = await getContacts(
          `${clientURL}getUsers`,
          setUser,
          setPopupMessages,
        );
        if (allUsers[0]) {
          setContacts(allUsers.filter((obj) => {
            const findUserLower = findUser.toLowerCase();
            return obj.usernamelowercase.includes(findUserLower);
          }));
        }
        setLoading(false);
      }, 1000);
    };

    // Trigger fetch
    fetchChats();
  }, [findUser]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Render Contacts
  return (
    <main
      id="contacts"
      style={loading ? { height: '100%' } : { height: 'auto' }}
    >
      <h1>Contacts</h1>
      {loading ? <Loading /> : contacts.map((obj) => (
        <Link
          key={obj.username}
          to={`/contact/${obj.username}`}
        >
          <div>
            <h2>{obj.username}</h2>
            <div>
              {new Date(obj?.created_on).toLocaleString()}
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Contacts;
