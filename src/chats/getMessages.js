const getMessages = async (
  url,
  setUser,
  currentChatGroupId,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send message details to api
  const getMessagesFetch = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ chatGroupId: currentChatGroupId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responsegetMessages = await getMessagesFetch.json();

  // Log details
  console.log(responsegetMessages);

  // Verify token legit on response
  if (responsegetMessages.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  }

  // Return response
  return responsegetMessages;
};

export default getMessages;
