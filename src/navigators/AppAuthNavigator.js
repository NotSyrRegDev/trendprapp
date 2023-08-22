
import TabNavigator from './TabNavigator';
import LoadingScreen from "../screens/LoadingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import BookingDetailScreen from "../screens/BookingDetailScreen";
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicketScreen from '../screens/TicketScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import TabNavigatorAuth from './TapNavigatorAuth';
import UserAccountAuth from '../screens/auth/UserAccountAuth';
import TimeBookingScreen from '../screens/TimeBookingScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import UserTicketDetail from '../screens/UserTicketDetail';


const Stack = createNativeStackNavigator();

export const AppAuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loading">
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="Tab"
        component={TabNavigatorAuth}
        options={{ animation: 'default' }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="TicketScreen"
        component={TicketScreen}
        options={{ animation: 'slide_from_right' }}
      />

      

      <Stack.Screen
        name="UserAccountAuth"
        component={UserAccountAuth}
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen
        name="UserTicketDetail"
        component={UserTicketDetail}
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
        name="EditAccountScreen"
        component={EditAccountScreen}
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