/* eslint-disable react/prop-types */
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import '../style/Contacts.scss';

function Contacts() {
  // Contacts
  const contacts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Render Contacts
  return (
    <main id="contacts">
      <h1>Contacts</h1>
      {contacts.map((obj) => (
        <Link
          key={obj}
          to="/contact"
        >
          <FaUser />
          <div>
            <h2>Chat group name</h2>
            <div>
              Last message here
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}

export default Contacts;
