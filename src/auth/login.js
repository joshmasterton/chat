const login = async (url, authInfo) => {
  // Token info
  const token = localStorage.getItem('chatToken');

  // Send user data to api
  const fetchLogin = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(authInfo),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // JSON data
  const responseLogin = await fetchLogin.json();

  // Store token
  if (responseLogin.token) {
    localStorage.setItem('chatToken', responseLogin.token);
  }

  // Return response
  return responseLogin;
};

export default login;
