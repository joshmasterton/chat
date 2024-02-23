const createChat = async (
  url,
  groupName,
  privacy,
  friendOne,
  friendTwo,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Create new private chat
  const createChatGroup = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      groupName,
      privacy,
      friendOne,
      friendTwo,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseCreateChat = await createChatGroup.json();

  // Verify token legit on response
  if (responseCreateChat.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  }

  // Return response
  return responseCreateChat;
};

export default createChat;
