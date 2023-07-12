import { create } from "zustand";
// api call
import { postLogin, postSignup } from "../../services";
// session storage
import {
  setUserInfo,
  removeUserInfo,
  getUserInfo,
  setUserInfoBool,
} from "./events";

export const useLogin = create((set) => ({
  loading: false,
  userInfo: getUserInfo() || {},
  isLoggined: setUserInfoBool() || false,

  // logout
  setLogout: () => {
    removeUserInfo();
    set((state) => ({ ...state, isLoggined: false }));
  },
  // login api call
  callLoginApi: async (req) => {
    set((state) => ({ ...state, loading: true }));
    const data = await postLogin(req);
    if (!data.error) {
      setUserInfo(data.data);
      set((state) => ({
        ...state,
        isLoggined: true,
        loading: false,
        userInfo: data.data,
      }));
      return data;
    } else {
      set((state) => ({ ...state, loading: false, isLoggined: false }));
      return data;
    }
  },
  // signup api call
  callSignupApi: async (req) => {
    set((state) => ({ ...state, loading: true }));
    const data = await postSignup(req);
    if (data.msg === "success") {
      set((state) => ({
        ...state,
        loading: false,
      }));
      return data;
    } else {
      set((state) => ({ ...state, loading: false }));
      return data;
    }
  },
}));
