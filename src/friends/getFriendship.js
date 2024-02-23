const getFriendship = async (
  url,
  friendOne,
  friendTwo,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Fetch friendship
  const getFriendshipFetch = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      friendOne,
      friendTwo,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseGetFriendship = await getFriendshipFetch.json();

  // Verify token legit on response
  if (responseGetFriendship.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  }

  // Return response
  return responseGetFriendship;
};

export default getFriendship;
