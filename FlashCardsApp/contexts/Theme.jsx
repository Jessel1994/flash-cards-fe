import { createContext, useState } from "react";
export const UserContext = createContext({
    user: null,
    setUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {}
  });
  
  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    return (
      <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
        {children}
      </UserContext.Provider>
    );
  };
  