import { createContext, useContext } from "react";
import { useState } from "react";

export const LoggedInContext = createContext();

export const useLoggedin = () => useContext(LoggedInContext);

const IsLoggedIn = ({ children }) => {
    const [ login, setLogin] = useState(false)

    return (
        <LoggedInContext.Provider
            value={{
                login,
                setLogin
            }}>
            {children}
        </LoggedInContext.Provider>
    )
}

export default IsLoggedIn
