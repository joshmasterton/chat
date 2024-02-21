const createFriendship = async (
  url,
  friendOne,
  friendTwo,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Create friendship from api
  const createFriendshipFetch = await fetch(url, {
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
  const responseCreateFriendship = await createFriendshipFetch.json();

  // Verify token legit on response
  if (responseCreateFriendship.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  }

  // Return response
  return responseCreateFriendship;
};

export default createFriendship;
