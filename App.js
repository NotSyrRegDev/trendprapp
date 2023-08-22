import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { AuthContextProvider } from './src/context/AuthContext';
import { AppContextProvider } from './src/context/AppContext';
import { Navigation } from "./src/navigators/Navigation";
import { AdminContextProvider } from "./src/context/AdminContext";

const App = () => {

  const [loaded] = useFonts({
    Cairo: require('./assets/fonts/Cairo-Regular.ttf'),
    Cairo_Bold: require('./assets/fonts/Cairo-Bold.ttf'),
    Cairo_Light: require('./assets/fonts/Cairo-Light.ttf'),
    Tajawal: require('./assets/fonts/Tajawal-Regular.ttf'),
    Tajawal_Bold: require('./assets/fonts/Tajawal-Bold.ttf'),
    Tajawal_Light: require('./assets/fonts/Tajawal-Light.ttf'),

  });

  if (!loaded) { 
    return null;
  }

  return (
    <AuthContextProvider>
      <AppContextProvider>
      <AdminContextProvider>
      <Navigation />
      </AdminContextProvider>
      <ExpoStatusBar style="auto" />
      </AppContextProvider>
    
    </AuthContextProvider>
  );
};

export default App;
