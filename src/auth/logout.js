// Log user out by removeing token
const logout = (setUser) => {
  // Remove token
  localStorage.removeItem('chatToken');

  return setUser(null);
};

export default logout;
