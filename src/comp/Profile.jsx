/* eslint-disable react/prop-types */
import React from 'react';
import '../style/Profile.scss';

function Profile({ user }) {
  // Render Profile
  return (
    <main id="profile">
      <main>
        <header className="rotate">
          <div />
        </header>
        <div>{user?.username.slice(0, 1)}</div>
      </main>
      <p>{user?.username}</p>
    </main>
  );
}

export default Profile;
