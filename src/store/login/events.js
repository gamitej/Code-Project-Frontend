// ============== CONSTANTS =================

const userlabel = "userInfo";

// =============== USER INFO ===================

export const getUserInfo = () => {
  const val = JSON.parse(window.sessionStorage.getItem(userlabel));
  return val;
};

export const setUserInfo = (val) => {
  window.sessionStorage.setItem(userlabel, JSON.stringify(val));
};

export const removeUserInfo = () => {
  window.sessionStorage.removeItem(userlabel);
};

export const setUserInfoBool = () => {
  const val = JSON.parse(window.sessionStorage.getItem(userlabel));
  if (val) return true;
  return false;
};
