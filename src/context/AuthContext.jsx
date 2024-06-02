import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const authActions = {
  SET_THEME: "SET_THEME",
  UPDATE_THEME: "UPDATE_THEME",
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER",
};

const initialState = {
  preferDark: (localStorage.getItem('theme', false) === 'true'),
  token: "",
  user: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case authActions.SET_THEME: {
      return {
        ...state,
        preferDark: payload.preferDark,
      };
    }
    case authActions.UPDATE_THEME: {
      localStorage.setItem('theme', !state.preferDark);
      return {
        ...state,
        preferDark: !state.preferDark,
      };
    }

    case authActions.SET_USER: {
      return {
        ...state,
        user: { ...payload },
      };
    }

    case authActions.DELETE_USER: {
      return {
        token: "",
        user: null,
      };
    }

    default:
      return state;
  }
};

export const AuthContext = createContext({
  authState: initialState,
  authDispatch: () => { },
  updateTheme: () => { },
  updateUser: () => { },
  deleteUser: () => { },
});

export function AuthStateProvider({ children }) {

  const [authState, authDispatch] = useReducer(reducer, initialState);
  const [address, setAddress] = useState("");

  function updateUser(payload = {}) {
    authDispatch({ type: authActions.SET_USER, payload });
  }

  function updateTheme() {
    authDispatch({ type: authActions.UPDATE_THEME });
  }

  function deleteUser() {
    authDispatch({ type: authActions.DELETE_USER });
  }

  return (
    <AuthContext.Provider
      value={{
        authState, authDispatch, updateTheme, updateUser, deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthState() {
  const authContext = useContext(AuthContext);

  return authContext;
}
