import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 


  return (
    <AppContext.Provider
      value={{ 
        isLoading,
        error,
       }}
    >
      {children}
    </AppContext.Provider>
  );
};
