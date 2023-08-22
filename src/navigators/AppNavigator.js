
import TabNavigator from './TabNavigator';
import LoadingScreen from "../screens/LoadingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import BookingDetailScreen from "../screens/BookingDetailScreen";
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginAdmin from '../screens/admin/LoginAdmin';
import TimeBookingScreen from '../screens/TimeBookingScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';


const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loading">
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ animation: 'default' }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginAdmin}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="UserAccountScreen"
        component={UserAccountScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{ animation: 'slide_from_right' }}
      />

    <Stack.Screen
      name="WhoWeAreScreen"
      component={WhoWeAreScreen}
      options={{ animation: 'slide_from_right' }}
    />

         <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{animation: 'slide_from_right'}}
      />
     
      <Stack.Screen
        name="TimeBooking"
        component={TimeBookingScreen}
        options={{animation: 'slide_from_right'}}
      />
     
      <Stack.Screen
        name="SeatBookingScreen"
        component={SeatBookingScreen}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
};