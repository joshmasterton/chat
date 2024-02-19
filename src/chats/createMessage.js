const createMessage = async (
  url,
  user,
  message,
  currentChatGroupId,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send message data to api
  const createMessageFetch = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      user,
      message,
      chatGroupId: currentChatGroupId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responsecreateMessage = await createMessageFetch.json();

  // Log details
  console.log(responsecreateMessage);

  // Verify token legit on response
  if (responsecreateMessage.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  } else if (responsecreateMessage.err) {
    setPopupMessages((popupMessage) => [...popupMessage, responsecreateMessage.err]);
  }

  // Return response
  return responsecreateMessage;
};

export default createMessage;
