// ============== CONSTANTS =================

const userlabel = "user";
const userId = "userId";
// ============== USER-NAME =================

export const getUser = () => {
  const user = window.sessionStorage.getItem(userlabel);
  if (user) {
    return true;
  }
  return false;
};

export const setUser = (name) => {
  window.sessionStorage.setItem(userlabel, name);
};

export const removeUser = () => {
  window.sessionStorage.removeItem(userlabel);
};

export const getUserName = () => {
  const user = window.sessionStorage.getItem(userlabel);
  return user;
};
// ============== USER-ID ==================

export const getUserId = () => {
  const id = window.sessionStorage.getItem(userId);
  if (id) {
    return id;
  }
  return "";
};

export const setUserId = (id) => {
  window.sessionStorage.setItem(userId, id);
};

export const removeUserId = () => {
  window.sessionStorage.removeItem(userId);
};
