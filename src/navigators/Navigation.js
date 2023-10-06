import React, { useContext } from "react";
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigator } from "./AppNavigator";
import { AdminAuthNavigator } from "./AdminAuthNavigator";
import {  AuthenticationContext } from '../context/AuthContext';
import { AppAuthNavigator } from "./AppAuthNavigator";


export const Navigation = () => {
  const { isAuthenticated , isAdmin } = useContext(AuthenticationContext);

  

  return (
    <>
  <NavigationContainer>
  { isAuthenticated && isAdmin && (
<AdminAuthNavigator />
  ) }
 

  { isAuthenticated && !isAdmin && (
    <AppAuthNavigator />
  ) }

  { !isAuthenticated && (
        <AppNavigator />
  ) }
      
    </NavigationContainer>
    </>
   
  );
};
