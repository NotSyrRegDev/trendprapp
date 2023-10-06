import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View , TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TicketScreen from '../screens/TicketScreen';
import { COLORS, FONTSIZE } from '../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserAccountAuth from '../screens/auth/UserAccountAuth';
import ExploreScreen from '../screens/ExploreScreen';
import { AppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator();

const TabNavigatorAuth = () => {

  const {  isFilterModalVisible  , setIsFilterModalVisible  } = useContext(AppContext);


  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {

         backgroundColor: '#262630',
          borderTopWidth: 0,
          height: 70,
        },
        tabBarItemStyle: {
          paddingHorizontal: 40,
          marginTop: 25,
          borderRadius: 10,
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.DarkGreen } : {},
                ]}
              >
                <Octicons
                  name="home"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />

<Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={({  }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.DarkGreen } : {},
                ]}
              >
                <View style={{ position: 'relative' }}>
                  <AntDesign
                    name="search1"
                    color={COLORS.White}
                    size={FONTSIZE.size_18}
                  />
                  { focused && (
                    <TouchableOpacity onPress={() => {
                      setIsFilterModalVisible(!isFilterModalVisible)
                    }}  style={ {
                      position: 'absolute',
                      top: -72,
                      right: 88,
                      width: 53,
                       height: 53,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 150,
                      backgroundColor: COLORS.DarkGreen
                    }} >
      <Ionicons
              name="filter"
              color={COLORS.White}
              size={25}
                  />
                  </TouchableOpacity>
                  ) }
                 
                 
                </View>
              </View>
            );
          },
        })}
      />

      <Tab.Screen
        name="TicketScreen"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.DarkGreen } : {},
                ]}
              >
                <Fontisto
                  name="ticket"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="UserAccountAuth"
        component={UserAccountAuth}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.DarkGreen } : {},
                ]}
              >
                 <AntDesign
                  name="user"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  activeTabBackground: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
};

export default TabNavigatorAuth;