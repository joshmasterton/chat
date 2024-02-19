const getChat = async (
  url,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send chatGroupId data to api
  const getChatFetch = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responsegetChat = await getChatFetch.json();

  // Log details
  console.log(responsegetChat);

  // Verify token legit on response
  if (responsegetChat.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  } else if (responsegetChat.err) {
    setPopupMessages((popupMessage) => [...popupMessage, responsegetChat.err]);
  }

  // Return response
  return responsegetChat;
};

export default getChat;
