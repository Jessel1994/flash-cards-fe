import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log('User context value:', user);
    return (<UserContext.Provider value = {{ user, setUser }}>{children}</UserContext.Provider>)
}