import React, { createContext, useReducer, useContext } from "react";
import reducer from "./reducer.js";
import axios from "axios";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  CLEAR_ALERT,
} from "./actions.js";

const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

const initialState = {
  name: name ? name : null,
  token: token,
  error: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUserToLocalStorage = ({ name, token }) => {
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/sign-up",
        currentUser
      );
      const { name, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { name, token },
      });
      addUserToLocalStorage({ name, token });
    } catch (err) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: err.response.data.msg,
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/sign-in",
        currentUser
      );
      const { name, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { name, token },
      });
      addUserToLocalStorage({ name, token });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err.response.data.msg,
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{ ...state, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
