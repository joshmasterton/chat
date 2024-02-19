/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import Auth from './comp/Auth';
import Chats from './comp/Chats';
import Chat from './comp/Chat';
import Contacts from './comp/Contacts';
import Profile from './comp/Profile';
import Contact from './comp/Contact';
import Popup from './comp/Popup';
import Loading from './comp/Loading';
import Nav from './comp/Nav';
import checkUser from './auth/checkUser';
import './App.scss';

// Nav-wrapper
function NavWrapper({
  user,
  setUser,
  clientURL,
  setFindUser,
  setMessages,
  setPopupMessages,
  setIsInputFocused,
}) {
  return (
    <>
      <Nav
        user={user}
        setUser={setUser}
        clientURL={clientURL}
        setFindUser={setFindUser}
        setMessages={setMessages}
        setPopupMessages={setPopupMessages}
        setIsInputFocused={setIsInputFocused}
      />
      <Outlet />
    </>
  );
}

// Render app
function App() {
  // Global variables
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [findUser, setFindUser] = useState('');
  const clientURL = 'https://zonochat-api.fly.dev/';

  // Loading variables
  const [loading, setLoading] = useState(true);

  // References
  const bottomRef = useRef(null);

  // Chat groups
  const [chats, setChats] = useState([]);

  // Active components
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [popupMessages, setPopupMessages] = useState([]);

  // Check user logged in
  useEffect(() => {
    const checkedUser = async () => {
      // If user log in
      const isUser = await checkUser(`${clientURL}checkUser`);
      if (isUser.username) {
        setPopupMessages((popupMessage) => [...popupMessage, `Welcome ${isUser.username}`]);
        setLoading(false);
        return setUser(isUser.username);
      }
      // Return empty
      setLoading(false);
      return null;
    };

    // Trigger check
    checkedUser();
  }, []);

  // Check input focus
  useEffect(() => {
    // Blur all inputs
    const handleScroll = () => {
      // Get all inputs and unblur
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        input.blur();
      });
    };

    // Scroll to bottom and attach listener
    const addEventListener = () => {
      document.body.addEventListener('touchmove', handleScroll);
    };

    // Clear and remove listener
    const removeEventListener = () => {
      document.body.removeEventListener('touchmove', handleScroll);
    };

    // Scroll to bottom and add scroll listener
    if (isInputFocused) {
      addEventListener();
    } else {
      removeEventListener();
    }

    return () => removeEventListener();
  }, [isInputFocused]);

  // Reacter-router-dom layout
  const routerMain = createHashRouter([
    {
      path: '/',
      element: <NavWrapper
        user={user}
        clientURL={clientURL}
        setUser={setUser}
        setFindUser={setFindUser}
        setMessages={setMessages}
        setPopupMessages={setPopupMessages}
        setIsInputFocused={setIsInputFocused}
      />,
      children: [
        {
          path: '/',
          element: <Chats
            chats={chats}
            setChats={setChats}
            clientURL={clientURL}
            setUser={setUser}
            setPopupMessages={setPopupMessages}
            setIsInputFocused={setIsInputFocused}
          />,
        },
        {
          path: '/*',
          element: <Chats
            chats={chats}
            setChats={setChats}
            clientURL={clientURL}
            setUser={setUser}
            setPopupMessages={setPopupMessages}
            setIsInputFocused={setIsInputFocused}
          />,
        },
        {
          path: '/chat/:chatId',
          element: <Chat
            user={user}
            messages={messages}
            setMessages={setMessages}
            clientURL={clientURL}
            setUser={setUser}
            setPopupMessages={setPopupMessages}
            bottomRef={bottomRef}
          />,
        },
        {
          path: '/contacts',
          element: <Contacts
            setUser={setUser}
            clientURL={clientURL}
            setPopupMessages={setPopupMessages}
            findUser={findUser}
          />,
        },
        {
          path: '/contact/:contactId',
          element: <Contact
            setUser={setUser}
            clientURL={clientURL}
            setPopupMessages={setPopupMessages}
          />,
        },
        {
          path: '/profile',
          element: <Profile
            user={user}
            setUser={setUser}
          />,
        },
      ],
    },
  ]);

  // Reacter-router-dom layout
  const routerAuth = createHashRouter([
    {
      path: '/*',
      element: <Auth
        title="Login"
        switchPageLink="/signup"
        switchPageTitle="Signup"
        clientURL={clientURL}
        switchPageDiv="Dont Have An Account?"
        setIsInputFocused={setIsInputFocused}
        setPopupMessages={setPopupMessages}
        setUser={setUser}
      />,
    },
    {
      path: '/signup',
      element: <Auth
        title="Signup"
        switchPageLink="/login"
        switchPageTitle="Login"
        clientURL={clientURL}
        switchPageDiv="Already Have An Account?"
        setIsInputFocused={setIsInputFocused}
        setPopupMessages={setPopupMessages}
        setUser={setUser}
      />,
    },
  ]);

  // Render app
  if (loading) return <Loading />;
  return (
    <>
      {user ? (
        <RouterProvider router={routerMain} />
      ) : (
        <RouterProvider router={routerAuth} />
      )}
      <Popup
        popupMessages={popupMessages}
        setPopupMessages={setPopupMessages}
      />
    </>
  );
}

export default App;
