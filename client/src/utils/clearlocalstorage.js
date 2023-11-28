
const ClearLocalStorage = () => {
  const clearStorage = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
  };

  return clearStorage();
};

export default ClearLocalStorage;
