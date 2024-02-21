/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoIosArrowBack, IoIosMenu } from 'react-icons/io';
import { GoHomeFill } from 'react-icons/go';
import { FaUsers, FaUser } from 'react-icons/fa';
import getMessages from '../chats/getMessages';
import Loading from './Loading';
import Menu from './Menu';
import createMessage from '../chats/createMessage';
import '../style/Nav.scss';

function Nav({
  user,
  setUser,
  clientURL,
  setMessages,
  setIsInputFocused,
  setPopupMessages,
}) {
  // Message content
  const [message, setMessage] = useState('');

  // Loading
  const [loading, setLoading] = useState(false);

  // Naviagate pages
  const navigate = useNavigate();
  const location = useLocation();

  // Component status
  const [isInput, setIsInput] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  // Input refs
  const inputRef = useRef(null);

  // Switch input on and off
  const onInputSwitch = () => {
    if (isInput) {
      navigate('/chats');
      return setIsInput(false);
    }
    return setIsInput(true);
  };

  // Switch back nav component on or off
  const onBackSwitch = () => {
    if (isBack || location.pathname?.slice(1) === 'profile') {
      navigate(-1);
      return setIsBack(false);
    }
    return setIsBack(true);
  };

  // Check current location
  useEffect(() => {
    if (location.pathname.includes('/chat/')) {
      onInputSwitch();
    }
    if (location.pathname === '/contacts') {
      onBackSwitch();
    }
    if (location.pathname.includes('/contact/')) {
      setIsBack(true);
    }
    if (!location.pathname.includes('/chat/')) {
      setIsInput(false);
    }
  }, [location]);

  // On message send
  const submitMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Send message to database
    setTimeout(async () => {
      await createMessage(
        `${clientURL}createMessage`,
        user?.username,
        message,
        location.pathname.slice(6),
        setUser,
        setPopupMessages,
      );
      setLoading(false);
      setMessage('');
      const allChats = await getMessages(
        `${clientURL}getMessages`,
        setUser,
        location.pathname.slice(6),
        setPopupMessages,
      );
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
              <GoHomeFill />
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
        className={isInput ? '' : 'hidden'}
      >
        <form method="POST" action="/">
          <button
            type="button"
            aria-label="Message"
            onClick={() => onInputSwitch()}
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
            onClick={() => onBackSwitch()}
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
