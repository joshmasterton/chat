const removeFriendship = async (
  url,
  friendOne,
  friendTwo,
  setUser,
  setPopupMessages,
) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Remove friendship from database
  const removeFriendshipFetch = await fetch(url, {
    method: 'DELETE',
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
  const responseRemoveFriendship = await removeFriendshipFetch.json();

  // Verify token legit on response
  if (responseRemoveFriendship.err === 'TokenError') {
    setUser(null);
    setPopupMessages((popupMessage) => [...popupMessage, 'User has timed out of session']);
  }

  // Return response
  return responseRemoveFriendship;
};

export default removeFriendship;
