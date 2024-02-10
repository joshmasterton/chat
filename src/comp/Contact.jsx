/* eslint-disable react/prop-types */
import React from 'react';
import {
  IoPersonAddSharp,
  IoPersonRemoveSharp,
} from 'react-icons/io5';
import '../style/Contact.scss';

function Contact() {
  // Render Contact
  return (
    <main id="contact">
      <main>
        <header className="rotate">
          <div />
        </header>
        <div>U</div>
        <button type="button" aria-label="Add">
          <IoPersonAddSharp />
        </button>
        <button type="button" aria-label="Remove">
          <IoPersonRemoveSharp />
        </button>
      </main>
    </main>
  );
}

export default Contact;
