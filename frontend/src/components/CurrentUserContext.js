import React, { useState, createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}
      >
        {children}
      </CurrentUserContext.Provider>
    </>
  );
};
