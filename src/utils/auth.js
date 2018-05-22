export const setAuthorContext = data => {
  localStorage.setItem('authorData', JSON.stringify(data));
};
export const getAuthorContext = () => {
  const authorData = JSON.parse(localStorage.getItem('authorData'));
  if (authorData && authorData.token) {
    return authorData;
  }
  return false;
};
export const removeAuthorContext = () => {
  localStorage.setItem('authorData', null);
};
export const isAuthenticated = () => {
  const authorData = JSON.parse(localStorage.getItem('authorData'));
  if (authorData && authorData.token) {
    return true;
  }
  return false;
};
