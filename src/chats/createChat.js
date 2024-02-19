const createChat = async (
  url,
  groupName,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send user data to api
  const createChatGroup = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ groupName }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseCreateChat = await createChatGroup.json();

  // Log details
  console.log(responseCreateChat);

  // Verify token legit on response
  if (responseCreateChat.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  } else if (responseCreateChat.err) {
    setPopupMessages((popupMessage) => [...popupMessage, responseCreateChat.err]);
  } else if (responseCreateChat.msg) {
    setPopupMessages((popupMessage) => [...popupMessage, responseCreateChat.msg]);
  }

  // Return response
  return responseCreateChat;
};

export default createChat;
