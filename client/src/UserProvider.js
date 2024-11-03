import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users] = useState([
    { id: "u1", name: "Adela" },
    { id: "u2", name: "Adam" },
    { id: "u3", name: "Jakub" },
    { id: "u4", name: "Eva" },
  ]);

  const [loggedInUser, setLoggedInUser] = useState("u1");

  const switchUser = (userId) => {
    setLoggedInUser(userId);
  };

  const value = { users, loggedInUser, switchUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);