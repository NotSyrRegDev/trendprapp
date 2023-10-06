import React, { createContext } from "react";
import {NavigationContainer} from '@react-navigation/native';

export const NavigationContext = createContext();

export const NavigationContextProvider = ({ children }) => {
 


  return (
    <NavigationContext.Provider
      value={{ 
       
       }}
    >
  
    {children}

    
    </NavigationContext.Provider>
  );
};
