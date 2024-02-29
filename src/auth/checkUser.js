import socket from '../socket/socket';

const checkUser = async (url) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send user data to api
  const fetchUser = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseUser = await fetchUser.json();

  // Store token
  if (responseUser.token) {
    localStorage.setItem('chatToken', responseUser.token);
  }

  // Notify socket
  socket.emit('userConnected', {
    username: responseUser.username,
    lastOnline: responseUser.lastOnline,
  });

  // Return response
  return {
    username: responseUser.username,
    lastOnline: responseUser.lastOnline,
  };
};

export default checkUser;
