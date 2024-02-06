/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import '../style/Auth.scss';

function Auth({
  title,
  switchPageLink,
  switchPageTitle,
  switchPageDiv,
  setIsInputFocused,
  setUser,
}) {
  // Switch page
  const navigate = useNavigate();

  // Show password variables
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // User details
  const [authInfo, setAuthInfo] = useState(
    { username: '', password: '', confirmPassword: '' },
  );

  // Store auth info when input changed
  const onSetAuthInfo = (e, info) => setAuthInfo({
    ...authInfo,
    [info]: e.target.value,
  });

  // Show or hide password to user
  const onPasswordViewChange = (
    passwordType,
    setPasswordType,
  ) => {
    if (passwordType) return setPasswordType(false);
    return setPasswordType(true);
  };

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
            type={showPassword ? 'text' : 'password'}
            value={authInfo.password}
            onChange={(e) => onSetAuthInfo(e, 'password')}
            style={{ paddingRight: '3.5rem' }}
          />
          <button
            type="button"
            onClick={() => onPasswordViewChange(
              showPassword,
              setShowPassword,
            )}
          >
            <div>Show Password</div>
            {!showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
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
                type={showConfirmPass ? 'text' : 'password'}
                value={authInfo.confirmPassword}
                onChange={(e) => onSetAuthInfo(e, 'confirmPassword')}
                style={{ paddingRight: '3.5rem' }}
              />
              <button
                type="button"
                onClick={() => onPasswordViewChange(
                  showConfirmPass,
                  setShowConfirmPass,
                )}
              >
                <div>Show Password</div>
                {!showConfirmPass ? <IoEye /> : <IoEyeOff />}
              </button>
            </label>
          )
          : null}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setUser(true);
            navigate('/');
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
