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
} from "./actions.js";

const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

const initialState = {
  name: name ? name : null,
  token: token,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // custom instances && interceptors
  // const authFetch = axios.create({
  //   baseURL: "/api/v1",
  // });

  // REQUEST

  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // // RESPONSE

  // authFetch.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response.status === 401) {
  //       logoutUser();
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  const addUserToLocalStorage = ({ name, token }) => {
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/sign-up",
        currentUser
      );
      console.log({ response });
      const { name, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { name, token },
      });
      addUserToLocalStorage({ name, token });
    } catch (err) {
      // console.log(err);
      dispatch({
        type: REGISTER_USER_ERROR,
      });
    }
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
      });
    }
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
