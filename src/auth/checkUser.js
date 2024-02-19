const checkUser = async (url) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send user data to api
  const fetchUser = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseUser = await fetchUser.json();

  // Store token
  if (responseUser.token) {
    localStorage.setItem('chatToken', responseUser.token);
  }

  // Return response
  return responseUser;
};

export default checkUser;
