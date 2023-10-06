import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export function DrawerProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}