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
  isChat,
  setIsChat,
  clientURL,
  setMessages,
  setPopupMessages,
  setIsInputFocused,
}) {
  return (
    <>
      <Nav
        user={user}
        setUser={setUser}
        isChat={isChat}
        setIsChat={setIsChat}
        clientURL={clientURL}
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
  const [contacts, setContacts] = useState([]);
  const clientURL = 'https://zonochat-api.fly.dev/';

  // Loading variables
  const [loading, setLoading] = useState(true);

  // References
  const bottomRef = useRef(null);

  // Chat groups
  const [chats, setChats] = useState([]);

  // Active components
  const [isChat, setIsChat] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [popupMessages, setPopupMessages] = useState([]);

  // Check user logged in
  useEffect(() => {
    const checkedUser = async () => {
      // If user log in
      const isUser = await checkUser(`${clientURL}checkUser`);
      if (isUser.username) {
        // Set default
        setPopupMessages((popupMessage) => [...popupMessage, `Welcome ${isUser.username}`]);
        setLoading(false);

        // Set user state
        return setUser(isUser);
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
        isChat={isChat}
        setIsChat={setIsChat}
        setUser={setUser}
        setMessages={setMessages}
        setPopupMessages={setPopupMessages}
        setIsInputFocused={setIsInputFocused}
      />,
      children: [
        {
          path: '/',
          element: <Chats
            user={user}
            chats={chats}
            setChats={setChats}
            clientURL={clientURL}
            setUser={setUser}
            setPopupMessages={setPopupMessages}
          />,
        },
        {
          path: '/*',
          element: <Chats
            user={user}
            chats={chats}
            setChats={setChats}
            clientURL={clientURL}
            setUser={setUser}
            setPopupMessages={setPopupMessages}
          />,
        },
        {
          path: '/chat/:chatId',
          element: <Chat
            user={user}
            messages={messages}
            setMessages={setMessages}
            clientURL={clientURL}
            setIsChat={setIsChat}
            setUser={setUser}
            setPopupMessages={setPopupMessages}
            bottomRef={bottomRef}
          />,
        },
        {
          path: '/contacts',
          element: <Contacts
            user={user}
            setUser={setUser}
            clientURL={clientURL}
            contacts={contacts}
            setContacts={setContacts}
            setPopupMessages={setPopupMessages}
            setIsInputFocused={setIsInputFocused}
          />,
        },
        {
          path: '/contact/:contactId',
          element: <Contact
            user={user}
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

  // Render If
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
