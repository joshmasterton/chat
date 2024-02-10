/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';
import signup from '../auth/signup';
import '../style/Auth.scss';

function Auth({
  title,
  switchPageLink,
  switchPageTitle,
  switchPageDiv,
  setIsInputFocused,
  setIsPopup,
  setUser,
}) {
  // Switch page
  const navigate = useNavigate();

  // Make sure body has scroll
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  // User details
  const [authInfo, setAuthInfo] = useState(
    { username: '', password: '', confirmPassword: '' },
  );

  // Store auth info when input changed
  const onSetAuthInfo = (e, info) => setAuthInfo({
    ...authInfo,
    [info]: e.target.value,
  });

  // Auth form
  return (
    <form method="POST" action="/" id="auth">
      <h1>{title}</h1>
      <main>
        <label htmlFor="username">
          <div>Username</div>
          <FaUser />
          <input
            id="username"
            placeholder="Username"
            type="text"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={authInfo.username}
            onChange={(e) => onSetAuthInfo(e, 'username')}
          />
        </label>
        <label htmlFor="password">
          <div>Password</div>
          <RiLockPasswordFill />
          <input
            id="password"
            placeholder="Password"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            type="password"
            value={authInfo.password}
            onChange={(e) => onSetAuthInfo(e, 'password')}
          />
        </label>
        {switchPageLink !== '/signup'
          ? (
            <label htmlFor="confirmPassword">
              <div>Confirm Password</div>
              <RiLockPasswordFill />
              <input
                id="confirmPassword"
                placeholder="Confirm Password"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                type="password"
                value={authInfo.confirmPassword}
                onChange={(e) => onSetAuthInfo(e, 'confirmPassword')}
              />
            </label>
          )
          : null}
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            setUser(true);
            navigate('/');
            // const signupUser = await signup(
            //   'http://localhost:9001/signup',
            //   authInfo,
            // );
            // console.log(signupUser);
          }}
        >
          {title}
        </button>
      </main>
      <footer>
        <div>{switchPageDiv}</div>
        <Link to={switchPageLink}>
          {switchPageTitle}
        </Link>
      </footer>
    </form>
  );
}

export default Auth;
