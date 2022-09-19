/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";
import AuthenticationService from "../services/AuthenticationService"

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem('token') || null,
  isUserLoggedIn: localStorage.getItem('token') || false
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    
    case "LOGIN":
      localStorage.setItem('token', action.payload)
      return {
        user: state.user,
        token: action.payload,
        isUserLoggedIn: action.payload ? true : false
      }
      
    case "REGISTER":
      localStorage.setItem('token', action.payload)
      return {
        user: state.user,
        token: action.payload,
        isUserLoggedIn: action.payload ? true : false
      }
    case "GET_CURRENT_USER":
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        user: action.payload,
        token: state.token,
        isUserLoggedIn: true
      };
    case "LOGOUT":
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        token: null,
        user: null,
        isUserLoggedIn : false
      }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isUserLoggedIn: state.isUserLoggedIn,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};