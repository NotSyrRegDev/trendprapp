import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ExploreScreen from '../screens/ExploreScreen';

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


const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
  
      <Drawer.Navigator initialRouteName="HomeScreen">

        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      </Drawer.Navigator>

  );
}