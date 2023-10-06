import React, { createContext, useState , useEffect } from "react";
import {  query , collection , getDocs , db  } from "../../firebase";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [categoryArray , setCategoriesArray] = useState([]);
  const [time, setTime] = useState({ minutes: 10, seconds: 0 });
  const [packagedTickets , setPackagedTickets] = useState([]);

  useEffect(() => {
    setIsLoading(true);
  
    const getCategoriesData = async () => {
      try {
        const q = query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCategoriesArray(categoriesData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getCategoriesData();
  }, []);




  return (
    <AppContext.Provider
      value={{ 
        isLoading,
        error,
        isFilterModalVisible,
        setIsFilterModalVisible,
        categoryArray,
        time,
        setTime,
        setPackagedTickets,
        packagedTickets
       }}
    >
      {children}
    </AppContext.Provider>
  );
};
