/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoIosArrowBack, IoIosMenu } from 'react-icons/io';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { GoHomeFill } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import Menu from './Menu';
import AddChat from './AddChat';
import '../style/Nav.scss';

function Nav({
  setUser,
  setIsInputFocused,
}) {
  // Naviagate pages
  const navigate = useNavigate();
  const location = useLocation();

  // Component status
  const [isInput, setIsInput] = useState(false);
  const [isFind, setIsFind] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isAddChat, setIsAddChat] = useState(false);

  // Input refs
  const inputRef = useRef(null);
  const findRef = useRef(null);

  // Switch input on and off
  const onInputSwitch = () => {
    if (isInput) {
      navigate('/');
      return setIsInput(false);
    }
    return setIsInput(true);
  };

  // Switch input on and off
  const onFindSwitch = () => {
    if (isFind) {
      navigate('/');
      return setIsFind(false);
    }
    return setIsFind(true);
  };

  const onBackSwitch = () => {
    if (isBack) {
      navigate('/contacts');
      return setIsBack(false);
    }
    return setIsBack(true);
  };

  // Check current location
  useEffect(() => {
    if (location.pathname === '/chat') {
      onInputSwitch();
    }
    if (location.pathname === '/contacts') {
      onFindSwitch();
    }
    if (location.pathname === '/contact') {
      setIsFind(false);
      onBackSwitch();
    }
  }, [location]);

  // On message send
  const submitMessage = (e) => {
    e.preventDefault();
  };

  // Render nav
  return (
    <nav>
      <ul className={isInput || isFind || isBack ? 'hidden' : ''}>
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
            <Link to="/">
              <GoHomeFill />
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-label="Add chat"
              onClick={() => setIsAddChat(true)}
            >
              <BiSolidMessageSquareAdd />
            </button>
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
            ref={inputRef}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Write Message..."
          />
          <button
            type="submit"
            aria-label="Message"
            onClick={(e) => submitMessage(e)}
          >
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
      <div
        id="findNav"
        className={isFind ? '' : 'hidden'}
      >
        <form method="POST" action="/">
          <button
            type="button"
            aria-label="Message"
            onClick={() => onFindSwitch()}
          >
            <IoIosArrowBack />
          </button>
          <input
            ref={findRef}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Find user..."
          />
          <button
            type="submit"
            aria-label="Message"
            onClick={(e) => submitMessage(e)}
          >
            <IoSearch />
          </button>
        </form>
      </div>
      <div
        id="contactNav"
        className={isBack ? '' : 'hidden'}
      >
        <form method="POST" action="/">
          <button
            type="button"
            aria-label="Message"
            onClick={() => onBackSwitch()}
          >
            <IoIosArrowBack />
          </button>
          <button
            type="submit"
            aria-label="Message"
            onClick={(e) => submitMessage(e)}
          >
            <FaUsers />
          </button>
        </form>
      </div>
      <AddChat
        isAddChat={isAddChat}
        setIsAddChat={setIsAddChat}
        setIsInputFocused={setIsInputFocused}
      />
      <Menu
        isMenu={isMenu}
        setUser={setUser}
        setIsMenu={setIsMenu}
      />
    </nav>
  );
}

export default Nav;
