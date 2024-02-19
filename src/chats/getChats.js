const getChats = async (url, setUser, setPopupMessages) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send user data to api
  const getChatsFetch = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseGetChats = await getChatsFetch.json();

  // Log details
  console.log(responseGetChats);

  // Verify token legit on response
  if (responseGetChats.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  } else if (responseGetChats.err) {
    setPopupMessages((popupMessage) => [...popupMessage, responseGetChats.err]);
  }

  // Return response
  return responseGetChats;
};

export default getChats;
