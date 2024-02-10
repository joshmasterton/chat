const signup = async (url, authInfo) => {
  // Send user data to api
  const fetchSignup = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(authInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // JSON data
  const responseSignup = await fetchSignup.json();

  // Return response
  return responseSignup;
};

export default signup;
