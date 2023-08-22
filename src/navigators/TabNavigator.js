import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import { COLORS, FONTSIZE } from '../theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TicketLoginScreen from '../screens/TicketLoginScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {

         backgroundColor: '#0b0b0b',
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
        name="TicketLoginScreen"
        component={TicketLoginScreen}
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
        name="UserAccountScreen"
        component={UserAccountScreen}
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

export default TabNavigator;