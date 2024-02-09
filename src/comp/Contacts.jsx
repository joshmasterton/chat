/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Contacts.scss';

function Contacts() {
  // Contacts
  const contacts = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
  ];

  // Scroll to bottom
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Render Contacts
  return (
    <main id="contacts">
      <h1>Contacts</h1>
      {contacts.map((obj) => (
        <Link
          key={obj}
          to="/contact"
        >
          <div>
            <h2>Username</h2>
            <div>
              Last online - 00:00 00/00/0000
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Contacts;
