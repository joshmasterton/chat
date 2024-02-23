const createPublicChat = async (
  url,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Create public chat
  const createPublicGroup = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responsecreatePublic = await createPublicGroup.json();

  // Verify token legit on response
  if (responsecreatePublic.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  }

  // Return response
  return responsecreatePublic;
};

export default createPublicChat;
