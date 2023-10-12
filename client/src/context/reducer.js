import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  CLEAR_ALERT,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.name,
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.name,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      name: null,
      token: null,
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      error: "",
    };
  }

  return state;
  //   throw new Error(`no such action : ${action.type}`);
};

export default reducer;
