/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut, IoSearch } from 'react-icons/io5';
import { RiMessage3Fill, RiSendPlaneFill } from 'react-icons/ri';
import { IoIosArrowBack, IoIosMenu } from 'react-icons/io';

import { FaUsers } from 'react-icons/fa';
import '../style/Nav.scss';

function Nav({
  setUser,
  setIsInputFocused,
}) {
  // Naviagate pages
  const navigate = useNavigate();
  const location = useLocation();

  // Message input
  const [isInput, setIsInput] = useState(false);

  // Find input
  const [isFind, setIsFind] = useState(false);

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

  // Check current location
  useEffect(() => {
    if (location.pathname === '/chat') {
      onInputSwitch();
    }
    if (location.pathname === '/contacts') {
      onFindSwitch();
    }
  }, [location]);

  // On message send
  const submitMessage = (e) => {
    e.preventDefault();
  };

  // Logout
  const logout = () => {
    setUser(false);
    navigate('/');
  };

  // Render nav
  return (
    <nav>
      <ul className={isInput || isFind ? 'hidden' : ''}>
        <div>
          <li>
            <button type="button" aria-label="Menu">
              <IoIosMenu />
            </button>
          </li>
          <li>
            <Link to="/">
              <RiMessage3Fill />
            </Link>
          </li>
          <li>
            <Link to="/contacts">
              <FaUsers />
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-label="Logout"
              onClick={() => logout()}
            >
              <IoLogOut />
            </button>
          </li>
        </div>
      </ul>
      <div
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
    </nav>
  );
}

export default Nav;
