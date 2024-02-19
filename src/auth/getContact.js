const getContact = async (
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
  const responseGetContact = await getUsers.json();

  // Log details
  console.log(responseGetContact);

  // Verify token legit on response
  if (responseGetContact.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  } else if (responseGetContact.err) {
    setPopupMessages((popupMessage) => [...popupMessage, responseGetContact.err]);
  }

  // Return response
  return responseGetContact;
};

export default getContact;
