import React, { createContext, useState, useContext, useEffect } from "react";

const UsersContext = createContext();

export const useUsersContext = () => useContext(UsersContext);

const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers !== null ? JSON.parse(storedUsers) : [];
  });
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
