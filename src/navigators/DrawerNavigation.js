import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('AdminDashboard')}
        title="Dashboard"
      />
    </View>
  );
}

function AddEventScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('AddEventDashboard')}
        title="Add Event"
      />
    </View>
  );
}



const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">

        <Drawer.Screen name="Home" component={HomeScreen} />

        <Drawer.Screen name="AddEvent" component={AddEventScreen} />
    
      </Drawer.Navigator>
    </NavigationContainer>
  );
}