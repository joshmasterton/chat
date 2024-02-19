/* eslint-disable react/prop-types */
import React from 'react';
import {
  IoPersonAddSharp,
  IoPersonRemoveSharp,
} from 'react-icons/io5';
import '../style/Profile.scss';

function Profile({ user }) {
  // Render Profile
  return (
    <main id="profile">
      <main>
        <header className="rotate">
          <div />
        </header>
        <div>{user?.slice(0, 1)}</div>
        <button type="button" aria-label="Add">
          <IoPersonAddSharp />
        </button>
        <button type="button" aria-label="Remove">
          <IoPersonRemoveSharp />
        </button>
      </main>
      <p>{user}</p>
    </main>
  );
}

export default Profile;
