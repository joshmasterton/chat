/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import Auth from './comp/Auth';
import Chats from './comp/Chats';
import Chat from './comp/Chat';
import Contacts from './comp/Contacts';
import Contact from './comp/Contact';
import Nav from './comp/Nav';
import './App.scss';

// Nav-wrapper
function NavWrapper({ setUser, setIsInputFocused }) {
  return (
    <>
      <Nav
        setUser={setUser}
        setIsInputFocused={setIsInputFocused}
      />
      <Outlet />
    </>
  );
}

// Render app
function App() {
  // User details
  const [user, setUser] = useState(false);

  // Bottom page ref
  const bottomRef = useRef(null);

  // Is input
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Check input focus
  useEffect(() => {
    // Blur all inputs
    const handleScroll = () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        input.blur();
      });
    };

    let timeoutId = null;

    const addEventListener = () => {
      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({
          behavior: 'instant',
        });
      }, 400);
      timeoutId = setTimeout(() => {
        window.addEventListener('scroll', handleScroll);
      }, 800);
    };

    const removeEventListener = () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };

    // Scroll to bottom and add scroll listener
    if (isInputFocused) {
      addEventListener();
    } else {
      removeEventListener();
    }

    return () => removeEventListener();
  }, [isInputFocused]);

  // Reacter-router-dom layout auth
  const routerAuth = createHashRouter([
    {
      path: '/',
      element: <Auth
        title="Login"
        switchPageLink="/signup"
        switchPageTitle="Signup"
        switchPageDiv="Dont Have An Account?"
        setIsInputFocused={setIsInputFocused}
        setUser={setUser}
      />,
    },
    {
      path: '/*',
      element: <Auth
        title="Login"
        switchPageLink="/signup"
        switchPageTitle="Signup"
        switchPageDiv="Dont Have An Account?"
        setIsInputFocused={setIsInputFocused}
        setUser={setUser}
      />,
    },
    {
      path: '/login',
      element: <Auth
        title="Login"
        switchPageLink="/signup"
        switchPageTitle="Signup"
        switchPageDiv="Dont Have An Account?"
        setIsInputFocused={setIsInputFocused}
        setUser={setUser}
      />,
    },
    {
      path: '/signup',
      element: <Auth
        title="Signup"
        switchPageLink="/login"
        switchPageTitle="Login"
        switchPageDiv="Already Have An Account?"
        setIsInputFocused={setIsInputFocused}
        setUser={setUser}
      />,
    },
  ]);

  // Reacter-router-dom layout main
  const router = createHashRouter([
    {
      path: '/',
      element: <NavWrapper
        setUser={setUser}
        setIsInputFocused={setIsInputFocused}
      />,
      children: [
        {
          path: '/',
          element: <Chats
            setUser={setUser}
          />,
        },
        {
          path: '/chat',
          element: <Chat
            setUser={setUser}
            bottomRef={bottomRef}
          />,
        },
        {
          path: '/contacts',
          element: <Contacts
            setUser={setUser}
          />,
        },
        {
          path: '/contact',
          element: <Contact
            setUser={setUser}
          />,
        },
      ],
    },
  ]);

  // No user return to auth
  if (!user) {
    return <RouterProvider router={routerAuth} />;
  }

  // User
  return <RouterProvider router={router} />;
}

export default App;
