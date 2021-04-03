import React, { createContext } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = AuthContext.Provider;
export default AuthContext