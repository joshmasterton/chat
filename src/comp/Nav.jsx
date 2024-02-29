/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiMessage3Fill, RiSendPlaneFill } from 'react-icons/ri';
import { IoIosArrowBack, IoIosMenu } from 'react-icons/io';
import { FaUsers, FaUser } from 'react-icons/fa';
import getMessages from '../chats/getMessages';
import Loading from './Loading';
import Menu from './Menu';
import socket from '../socket/socket';
import createMessage from '../chats/createMessage';
import '../style/Nav.scss';

function Nav({
  user,
  setUser,
  clientURL,
  isChat,
  setIsChat,
  setMessages,
  setIsInputFocused,
  setPopupMessages,
}) {
  // Message content
  const [message, setMessage] = useState('');

  // Loading
  const [loading, setLoading] = useState(false);

  // Naviagate pages
  const location = useLocation();
  const navigate = useNavigate();

  // Component status
  const [isInput, setIsInput] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  // Input refs
  const inputRef = useRef(null);

  // Check current location
  useEffect(() => {
    // Keyboard layouts
    if (location.pathname.includes('/chats')) {
      setIsBack(false);
      setIsInput(false);
      setIsChat(false);
    } else if (location.pathname === '/contacts') {
      setIsBack(false);
      setIsInput(false);
      setIsChat(false);
    } else if (location.pathname.includes('/contact/')) {
      setIsBack(true);
      setIsInput(false);
      setIsChat(false);
    } else if (location.pathname.includes('/chat/')) {
      setIsBack(false);
      setIsInput(true);
      setIsChat(false);
    }
  }, [location, isChat]);

  // On message send
  const submitMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send message to database
    setTimeout(async () => {
      // Add message to database
      await createMessage(
        `${clientURL}createMessage`,
        user?.username,
        message,
        location.pathname.slice(6),
        setUser,
        setPopupMessages,
      );
      // Emit to socket for all in chat
      socket.emit('sendMessage', location.pathname.slice(6));
      socket.emit('sendChats');

      // Reset default values
      setLoading(false);
      setMessage('');

      // Get all messages in chat
      const allChats = await getMessages(
        `${clientURL}getMessages`,
        setUser,
        location.pathname.slice(6),
        setPopupMessages,
      );

      // If chats store in state
      if (allChats[0]) return setMessages(allChats);
      return setMessages([]);
    }, 100);
  };

  // Render nav
  return (
    <nav>
      <ul className={
        isInput
        || isBack
        || isChat
        || location.pathname?.slice(1) === 'profile' ? 'hidden' : ''
      }
      >
        <div>
          <li>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setIsMenu(true)}
            >
              <IoIosMenu />
            </button>
          </li>
          <li>
            <Link to="/chats">
              <RiMessage3Fill />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FaUser />
            </Link>
          </li>
          <li>
            <Link to="/contacts">
              <FaUsers />
            </Link>
          </li>
        </div>
      </ul>
      <div
        id="writeNav"
        className={isInput || isChat ? '' : 'hidden'}
      >
        <form method="POST" action="/">
          <button
            type="button"
            aria-label="Message"
            onClick={() => {
              setIsChat(false);
              navigate('/chats');
            }}
          >
            <IoIosArrowBack />
          </button>
          <input
            enterKeyHint="send"
            ref={inputRef}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write Message..."
          />
          <button
            type="submit"
            aria-label="Message"
            onClick={(e) => submitMessage(e)}
          >
            {loading ? <Loading /> : <RiSendPlaneFill />}
          </button>
        </form>
      </div>
      <div
        id="contactNav"
        className={isBack || location.pathname?.slice(1) === 'profile' ? '' : 'hidden'}
      >
        <form>
          <button
            type="button"
            aria-label="Message"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
          </button>
          <div
            type="button"
            aria-label="Message"
          >
            <FaUser />
          </div>
        </form>
      </div>
      <Menu
        user={user}
        isMenu={isMenu}
        setUser={setUser}
        setIsMenu={setIsMenu}
      />
    </nav>
  );
}

export default Nav;
