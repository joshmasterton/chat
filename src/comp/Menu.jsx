/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoHomeFill } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { IoClose, IoLogOut } from 'react-icons/io5';
import '../style/Menu.scss';

function Menu({
  isMenu,
  setIsMenu,
  setUser,
}) {
  // Naviagate pages
  const navigate = useNavigate();

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

  // Logout
  const logout = () => {
    setUser(false);
    navigate('/');
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
          <h2>Username</h2>
          <div>Last online - 00:00</div>
        </header>
        <main>
          <Link to="/" onClick={() => onLinkClick()}>
            <GoHomeFill />
            Home
          </Link>
          <Link to="/contacts" onClick={() => onLinkClick()}>
            <FaUsers />
            Contacts
          </Link>
          <button
            type="button"
            aria-label="Logout"
            onClick={() => logout()}
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
