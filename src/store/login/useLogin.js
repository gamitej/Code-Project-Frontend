import { create } from "zustand";
// api call
import { postLogin, postSignup } from "../../services";
// session storage
import { getUser, getUserId, removeUser, setUser, setUserId } from "./events";

export const useLogin = create((set) => ({
  user: "",
  userId: getUserId() || "",
  loading: false,
  isLoggined: getUser() || false,

  // logout
  setLogout: () => {
    removeUser();
    set((state) => ({ ...state, isLoggined: false }));
  },
  // login api call
  callLoginApi: async (req) => {
    set((state) => ({ ...state, loading: true }));
    const data = await postLogin(req);
    if (!data.error) {
      setUser(req.username);
      setUserId(data.id);
      set((state) => ({
        ...state,
        isLoggined: true,
        loading: false,
        user: req.username,
        userId: data.id,
      }));
      return data;
    } else {
      set((state) => ({ ...state, loading: false }));
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
