import Dashboard from '../screens/admin/Dashboard';
import AddEvent from '../screens/admin/events/AddEvent';
import EditEvent from '../screens/admin/events/EditEvent';
import LoginAdmin from '../screens/admin/LoginAdmin';
import LoadingAdminScreen from '../screens/admin/LoadingAdminScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManageEvent from '../screens/admin/events/ManageEvent';
import ManageTimes from '../screens/admin/times/ManageTimes';
import AddTime from '../screens/admin/times/AddTime';
import ManageActors from '../screens/admin/actors/ManageActors';
import AddActor from '../screens/admin/actors/AddActor';
import ManageTickets from '../screens/admin/tickets/ManageTickets';
import AddTicket from '../screens/admin/tickets/AddTicket';
import ManageBookings from '../screens/admin/bookings/ManageBookings';
import TicketsView from '../screens/admin/tickets/TicketsView';
import EventDetailAdmin from '../screens/admin/EventDetailAdmin';
import AdminBookingDetail from '../screens/admin/AdminBookingDetail';
import EditTime from '../screens/admin/times/EditTime';
import EditActor from '../screens/admin/actors/EditActor';
import EditTicket from '../screens/admin/tickets/EditTicket';
import DashboardControl from '../screens/admin/DashboardControl';
import AddCategory from '../screens/admin/category/AddCategory';
import Categories from '../screens/admin/category/Categories';
import EditCateogry from '../screens/admin/category/EditCateogry';
import AddAdmin from '../screens/admin/admin/AddAdmin';


const Stack = createNativeStackNavigator();

export const AdminAuthNavigator = () => { 

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='AddTime'  >

     
<Stack.Screen
        name="LoadingAdmin"
        component={LoadingAdminScreen}
        options={{ animation: 'slide_from_right' }}
      />


    { /* ADMIN SCREENS */ }
    <Stack.Screen
      name="AdminDashboard"
      component={Dashboard}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Add Event SCREENS */ }
    <Stack.Screen
      name="DashboardControl"
      component={DashboardControl}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Add Event SCREENS */ }
    <Stack.Screen
      name="AddEventDashboard"
      component={AddEvent}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Add Event SCREENS */ }
    <Stack.Screen
      name="AddCategoryDashboard"
      component={AddCategory}
      options={{animation: 'slide_from_bottom'}}
    />

{ /* Edit Event SCREENS */ }
    <Stack.Screen
      name="EventDetailAdmin"
      component={EventDetailAdmin}
      options={{animation: 'slide_from_bottom'}}
    />

{ /* Edit Event SCREENS */ }
    <Stack.Screen
      name="TicketsView"
      component={TicketsView}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="EditEventDashboard"
      component={EditEvent}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="LoginAdminDashboard"
      component={LoginAdmin}
      options={{animation: 'slide_from_bottom'}}
    />
    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ManageEvent"
      component={ManageEvent}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ManageTimes"
      component={ManageTimes}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ِAddTime"
      component={AddTime}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ِEditTime"
      component={EditTime}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ManageActors"
      component={ManageActors}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="AddActor"
      component={AddActor}
      options={{animation: 'slide_from_bottom'}}
    />
    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ِEditActor"
      component={EditActor}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ManageTickets"
      component={ManageTickets}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="AddTicket"
      component={AddTicket}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="EditTicket"
      component={EditTicket}
      options={{animation: 'slide_from_bottom'}}
    />
  

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="ManageBookings"
      component={ManageBookings}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="AdminBookingDetail"
      component={AdminBookingDetail}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="CategoriesAdmin"
      component={Categories}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="EditCategory"
      component={EditCateogry}
      options={{animation: 'slide_from_bottom'}}
    />

    { /* Edit Event SCREENS */ }
    <Stack.Screen
      name="AddAdmin"
      component={AddAdmin}
      options={{animation: 'slide_from_bottom'}}
    />

 
  

  </Stack.Navigator>
  );
    
   

}