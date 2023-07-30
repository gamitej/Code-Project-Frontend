import PropTypes from "prop-types";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
// img
import logo from "../../assests/logo-2.png";
// comp
import {
  BasicModal,
  InputTextField,
  LoadingButton,
  Password,
} from "../../components";
// store
import { useLogin } from "../../store/login/useLogin";
import axios from "axios";

const usernameRegex = /^([a-zA-Z])$/;

const LoginModal = ({
  open,
  setOpen,
  handleOpen,
  buttonLabel = "login",
  setName = () => {},
}) => {
  // =========== STATES ===============
  const { callLoginApi, callSignupApi, loading, isLoggined } = useLogin();
  const [form, setForm] = useState({ username: "", password: "" });

  // =========== EVENT HANDLERS ===============
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setOpen(false);
    setForm({ username: "", password: "" });
  };

  const resetSignUp = () => {
    setForm({ username: "", password: "" });
    setName("login");
  };

  const handleName = (name) => {
    setForm({ username: "", password: "" });
    setName(name);
  };

  // API CALL'S

  const handleSubmit = async (e) => {
    e.preventDefault();

    // * validation for username
    const checkUsernameRegex = usernameRegex.test(form.username);

    if (checkUsernameRegex) {
      toast.error("Invalid username. Only a-z, A-Z & 0-9 are allowed.", {
        duration: 1000,
      });
      return;
    }

    // * axios cancel token -> if login takes time
    const signal = axios.CancelToken.source();
    const signalCancel = setTimeout(() => {
      signal.cancel();
      console.log("login cancelled");
    }, 45000);

    if (buttonLabel === "login") {
      // * LOGIN API CALL
      const isLogin = await callLoginApi(form, signal);
      clearTimeout(signalCancel);
      if (isLoggined) {
        reset();
      }
      if (!isLogin.error) {
        toast.success(isLogin.message, { duration: 1200 });
        reset();
      } else {
        toast.error(isLogin.message, { duration: 1200 });
      }
    } else {
      // * SIGNUP API CALL
      const isSignUp = await callSignupApi(form, signal);
      if (!isSignUp.error) {
        toast.success(isSignUp.message, { duration: 1200 });
        setTimeout(() => {
          toast.success("Please Login", { duration: 1200 });
        }, [1200]);
        resetSignUp();
      } else {
        toast.error(isSignUp.message, { duration: 1200 });
      }
    }
  };

  const handleClose = () => {
    setOpen(!open);
    setForm((prevState) => ({ ...prevState, username: "", password: "" }));
  };

  return (
    <React.Fragment>
      <BasicModal
        open={open}
        handleOpen={handleOpen}
        onClose={handleClose}
        height="30rem"
        width="30rem"
      >
        <form
          className="flex flex-col justify-around items-center w-full h-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center items-center gap-y-2">
            <img alt="" src={logo} className="h-[5rem] w-[8rem]" />
            <h2 className="text-3xl font-semibold">Welcome to code</h2>
          </div>
          <InputTextField
            name="username"
            label="Username"
            placeholder="Enter username"
            onChange={handleChange}
            value={form.username}
            maxLength={8}
          />
          <Password
            maxLength={32}
            value={form.password}
            onChange={handleChange}
          />

          <LoadingButton
            width="80%"
            disabled={loading}
            isLoading={loading}
            label={buttonLabel}
          />
          <p>
            {buttonLabel === "login" ? "Not Registered ? " : "Registered ? "}
            <span
              className="text-red-400 font-semibold cursor-pointer hover:text-blue-400 capitalize"
              onClick={() =>
                handleName(buttonLabel === "login" ? "sign up" : "login")
              }
            >
              {buttonLabel === "login" ? "sign up" : "login"}
            </span>{" "}
          </p>
          <br />
        </form>
      </BasicModal>
    </React.Fragment>
  );
};

LoginModal.propTypes = {
  buttonLabel: PropTypes.string,
  handleOpen: PropTypes.any,
  onClose: PropTypes.any,
  open: PropTypes.any,
};

export default LoginModal;
