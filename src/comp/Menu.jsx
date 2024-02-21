/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoHomeFill } from 'react-icons/go';
import { FaUsers, FaUser } from 'react-icons/fa';
import { IoClose, IoLogOut } from 'react-icons/io5';
import logout from '../auth/logout';
import '../style/Menu.scss';

function Menu({
  user,
  isMenu,
  setIsMenu,
  setUser,
}) {
  // Stop scroll if menu present
  useEffect(() => {
    if (isMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenu]);

  // Hide menu on link click
  const onLinkClick = () => {
    setIsMenu(false);
  };

  // Render menu
  return (
    <div
      id="menu"
      className={isMenu ? '' : 'hidden'}
    >
      <button
        type="button"
        aria-label="Menu off"
        onClick={() => setIsMenu(false)}
        className={isMenu ? '' : 'hidden'}
      />
      <div
        className={isMenu ? '' : 'hidden'}
      >
        <header>
          <h2>{user?.username}</h2>
          <div>
            {new Date(user?.lastOnline).toLocaleString()}
          </div>
        </header>
        <main>
          <Link to="/chats" onClick={() => onLinkClick()}>
            <GoHomeFill />
            Home
          </Link>
          <Link to="/profile" onClick={() => onLinkClick()}>
            <FaUser />
            Profile
          </Link>
          <Link to="/contacts" onClick={() => onLinkClick()}>
            <FaUsers />
            Contacts
          </Link>
          <button
            type="button"
            aria-label="Logout"
            onClick={() => logout(setUser)}
          >
            <IoLogOut />
            Logout
          </button>
        </main>
        <footer>
          <button
            type="button"
            aria-label="close"
            onClick={() => onLinkClick()}
          >
            <IoClose />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Menu;
