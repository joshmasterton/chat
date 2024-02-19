/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import Loading from './Loading';
import signup from '../auth/signup';
import login from '../auth/login';
import '../style/Auth.scss';

function Auth({
  title,
  switchPageLink,
  switchPageTitle,
  switchPageDiv,
  clientURL,
  setIsInputFocused,
  setPopupMessages,
  setUser,
}) {
  // Loading status
  const [loading, setLoading] = useState(false);
  // Make sure body has scroll
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  // User details
  const [authInfo, setAuthInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Show passwords variables
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Store auth info when input changed
  const onSetAuthInfo = (e, info) => setAuthInfo({
    ...authInfo,
    [info]: e.target.value,
  });

  // Auth process
  const authProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Singup process
    setTimeout(async () => {
      if (switchPageLink !== '/signup') {
        const signupUser = await signup(
          `${clientURL}signup`,
          authInfo,
        );
        if (signupUser.err) {
          setPopupMessages((popupMessage) => [...popupMessage, signupUser.err]);
          return setLoading(false);
        }
        setLoading(false);
        setPopupMessages((popupMessage) => [...popupMessage, `Welcome ${signupUser.username}`]);
        return setUser(signupUser.username);
      }
      // Login process
      if (switchPageLink === '/signup') {
        const loginUser = await login(
          `${clientURL}login`,
          authInfo,
        );
        if (loginUser.err) {
          setPopupMessages((popupMessage) => [...popupMessage, loginUser.err]);
          return setLoading(false);
        }
        setLoading(false);
        setPopupMessages((popupMessage) => [...popupMessage, `Welcome ${loginUser.username}`]);
        return setUser(loginUser.username);
      }
      return null;
    }, 1000);
  };

  // Show password
  const onShowPassword = (passwordType, setPasswordType) => {
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
          />
          <button
            type="button"
            aria-label="show"
            onClick={() => onShowPassword(showPassword, setShowPassword)}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
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
              />
              <button
                type="button"
                aria-label="show"
                onClick={() => onShowPassword(showConfirmPass, setShowConfirmPass)}
              >
                {showConfirmPass ? <IoEyeOff /> : <IoEye />}
              </button>
            </label>
          )
          : null}
        <button
          type="submit"
          onClick={(e) => authProcess(e)}
        >
          {!loading ? title : <Loading />}
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
