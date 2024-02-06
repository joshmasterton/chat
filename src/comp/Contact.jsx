/* eslint-disable react/prop-types */
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import '../style/Contact.scss';

function Contact() {
  return (
    <main id="contact">
      <div>
        <FaUser />
        <main>
          <h1>Username</h1>
          <div>Last online - 00:00</div>
          <div>Friend Status - 0</div>
        </main>
        <button type="button">
          Message
        </button>
        <footer>
          <button type="button">
            Add
          </button>
          <button type="button">
            Remove
          </button>
        </footer>
      </div>
    </main>
  );
}

export default Contact;
