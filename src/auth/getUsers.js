const getContacts = async (
  url,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send user data to api
  const getUsers = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseGetUsers = await getUsers.json();

  // Log details
  console.log(responseGetUsers);

  // Verify token legit on response
  if (responseGetUsers.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  } else if (responseGetUsers.err) {
    setPopupMessages((popupMessage) => [...popupMessage, responseGetUsers.err]);
  }

  // Return response
  return responseGetUsers;
};

export default getContacts;
