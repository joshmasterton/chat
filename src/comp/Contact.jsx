/* eslint-disable react/prop-types */
import React from 'react';
import {
  IoPersonAddSharp,
  IoPersonRemoveSharp,
} from 'react-icons/io5';

import '../style/Contact.scss';

function Contact() {
  return (
    <main id="contact">
      <div>
        <main>
          <div>U</div>
          <div>
            <h2>Username</h2>
            <div>Last online - 00:00</div>
          </div>
          <footer>
            <button type="button" aria-label="Add">
              <IoPersonAddSharp />
            </button>
            <button type="button" aria-label="Remove">
              <IoPersonRemoveSharp />
            </button>
          </footer>
        </main>
      </div>
    </main>
  );
}

export default Contact;
