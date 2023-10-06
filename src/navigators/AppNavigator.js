import {useState , useCallback} from 'react';
import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView , View , Text  , TouchableOpacity , Image, StyleSheet , TextInput } from 'react-native';
import TabNavigator from './TabNavigator';
import PaymentScreen from '../screens/PaymentScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginAdmin from '../screens/admin/LoginAdmin';
import TimeBookingScreen from '../screens/TimeBookingScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import SearchScreen from '../screens/SearchScreen';
import {COLORS, SPACING , FONTSIZE , BORDERRADIUS, FONTFAMILY} from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import ExploreScreen from "../screens/ExploreScreen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import SettingComponentDrawer from "../components/SettingComponentDrawer";
import TicketLoginScreen from "../screens/TicketLoginScreen";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import PillingDetailScreen from "../screens/PillingDetailScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

function CustomDrawerItem({ content, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>{content}</View>
    </TouchableOpacity>
  );
}

export default function CustomDrawerItemList(props) {
  const { state, navigation } = props;

  return (
    <View>
      {state.routes.slice(0, 4).map((route, index) => {
        const { options } = props.descriptors[route.key];

        let IconComponent = null;
        switch (options.IconCategory) {
          case 'FontAwesome':
            IconComponent = FontAwesome;
            break;
          case 'MaterialCommunityIcons':
            IconComponent = MaterialCommunityIcons;
            break;
          case 'AntDesign':
            IconComponent = AntDesign;
            break;
          case 'Ionicons':
            IconComponent = Ionicons;
            break;
          case 'Entypo':
            IconComponent = Entypo;
            break;

          default:
            IconComponent = AntDesign;

            break;
        }
        const customContent = (
          <View className="flex-row items-center my-3 mb-3">
         
            <IconComponent name={options.iconName} size={20} color={COLORS.White} />
            <Text style={styles.fontTajwal} className="text-white mx-4">
              {options.drawerLabel || route.name}
            </Text>
          </View>
        );

        return (
          <CustomDrawerItem
            key={route.key}
            content={customContent}
            onPress={() => {
              navigation.navigate(route.name);
            }}
          />
        );
      })}
    </View>
  );
}

const CustomHeader = ({ navigation }) => {

  const { isAuthenticated  } = useContext(AuthenticationContext);

  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = () => {
    if (searchText) {
      navigation.navigate('SearchScreen', {
        searchText: searchText,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
    }, [])
  );


  return (
    <View  style={{ paddingHorizontal: 15 , backgroundColor: COLORS.BlackTheme }} >
 <View className="flex flex-row items-center justify-between pt-16 k pb-2" style={{ backgroundColor: COLORS.BlackTheme }} >
        
        
        <View>
        {isAuthenticated ? (
          <TouchableOpacity  onPress={() => {

      navigation.navigate('UserAccountAuth');
      }}  >
      <AntDesign
      
      name="user"
      color={COLORS.DarkGreen}
      size={FONTSIZE.size_24}
      />
    </TouchableOpacity>
        ): (
          <TouchableOpacity  onPress={() => {
      navigation.navigate('UserAccountScreen');
      }}  >
      <AntDesign
      
      name="user"
      color={COLORS.DarkGreen}
      size={FONTSIZE.size_24}
      />

      </TouchableOpacity>
        )}

        </View>
    <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo} />

    <TouchableOpacity  onPress={() => {
      navigation.toggleDrawer();
    }}  >
    <Entypo
       
       name="menu"
       color={COLORS.DarkGreen}
       size={FONTSIZE.size_24}
     />

    </TouchableOpacity>
    </View>

    <View style={styles.searchBarContainer} className="mt-4 mb-5" >
<Ionicons name={"search"} size={22} color="#DADADA" />
    <TextInput
    className="block text-right px-2 text-base text-gray-500"
        style={styles.searchInput} 
        value={searchText}
        placeholder='أبحث عن الفعاليات الي تحبها'
        onChangeText={text => setSearchText(text)}
        placeholderTextColor="#888"
        onSubmitEditing={handleSearchSubmit}
      />
      <TouchableOpacity onPress={handleSearchSubmit} >
    
      </TouchableOpacity>
        
    </View>


    </View>
   
  );
};


const HeaderScreenGoBack = ({ navigation , title   }) => {
  return (
    <View  style={{ paddingHorizontal: 35 , backgroundColor:COLORS.NavTheme }} >
 <View className="flex flex-row justify-end pt-16 pb-2" >
       
    <View>
    <Text className="text-xl text-white text-left" style={[styles.font ]} >  {title}  </Text>  
    </View>

    <TouchableOpacity  onPress={() => {
      navigation.goBack();
    }}  >
     <Feather name="chevron-right" size={24} color={COLORS.White} />

    </TouchableOpacity>
  
    </View>
    </View>
   
  );
}

const HeaderBookingSeat = ({ navigation , title   }) => {
  return (
    <View style={{ paddingHorizontal: 35 , backgroundColor: COLORS.NavTheme }} >
 <View className="flex flex-row justify-end pt-16  pb-2" >
       
    <View>
    <Text className="text-xl text-white text-left" style={[styles.font ]} >  {title}  </Text>  
    </View>

    <TouchableOpacity  onPress={() => {
     navigation.dispatch(
                  DrawerActions.jumpTo('Tab' , {
                    refresh: true
                  })
                );
    }}  >
     <Feather name="chevron-right" size={24} color={COLORS.White} />

    </TouchableOpacity>
  
    </View>
    </View>
   
  );
}

export const AppNavigator = () => {

  const navigation = useNavigation();

  return (
    <Drawer.Navigator
    drawerContentOptions={{
          activeTintColor: COLORS.White,
          inactiveTintColor: COLORS.White,
          activeBackgroundColor: 'transparent',
          inactiveBackgroundColor: 'transparent',
        }}
    initialRouteName="Tab"
    drawerContent={
      (props) => {
        return (
          <SafeAreaView>
         <View style={{
                    marginTop: 32,
                    height: 190,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                  }}  
                   >
      <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo}  />

       <View className="mt-5" >
        <TouchableOpacity
        className="mt-3 text-white py-2 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}> تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
      </View>

            <View
        style={{
          marginTop: 15,
          borderBottomColor: '#f4f4f4',
          borderBottomWidth: 2,
          direction: 'rtl',
          justifyContent: 'flex-start',
          color: 'white',
        }}
      >
        <CustomDrawerItemList {...props} />
      </View>

            <View
        style={{
          marginTop: 15,
          direction: 'rtl',
          justifyContent: 'flex-start',
          color: 'white',
        }}
      >
        <SettingComponentDrawer
          icon="comment-question-outline"
          heading="الاسئلة الشائعة"
          navigation={navigation}
          toNav={"FaqScreen"}
        />
         <SettingComponentDrawer
          icon="information-outline"
          heading="من نحن"
          navigation={navigation}
          toNav={"WhoWeAreScreen"}
        />
        <SettingComponentDrawer
          icon="phone-hangup-outline"
          heading="تواصل معنا"
          navigation={navigation}
          toNav={"ContactUsScreen"}
        />
      </View>


          </SafeAreaView>
        )
      }
    }
    screenOptions={{
     
      header: (props) => <CustomHeader {...props} />,
    drawerStyle: {
      backgroundColor: COLORS.BlackTheme,
      width: 235,
    },
    headerStyle: {
      backgroundColor: COLORS.BlackTheme,
    },
    headerTintColor: COLORS.BlackTheme,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    drawerLabelStyle: {
      color: COLORS.White,
      fontFamily: FONTFAMILY.tajawal
    },
    drawerPosition: "right", // Set the drawer position to 'right'
  
  }}
  >
    <Drawer.Screen
      name="Home"
      options={{
        drawerLabel: "الرئيسية",
        title: "Home",
        IconCategory: 'Octicons',
        iconName: 'home',
       
      }}
      component={TabNavigator}
    />
   
    <Drawer.Screen
      name="Explore"
      options={{
        drawerLabel: "بحث",
        IconCategory: 'AntDesign',
        iconName: 'search1',
       
      }}
      component={ExploreScreen}
    />
    <Drawer.Screen
      name="Tickets"
      options={{
        drawerLabel: "تذاكري",
        IconCategory: 'Entypo',
        iconName: 'ticket',
       
      }}
      component={TicketLoginScreen}
    />

    <Drawer.Screen
      name="Login"
      options={{
        drawerLabel: "الحساب",
        IconCategory: 'AntDesign',
        iconName: 'user',
        
      }}
      component={UserAccountScreen}
    />

    {/* <Drawer.Screen
      name="Loading"
      component={LoadingScreen}
      options={{
    drawerLabel: '',
      }}
    /> */}
    <Drawer.Screen
      name="Tab"
      component={TabNavigator}
      options={{
    drawerLabel: '',
      }}
    />

    <Drawer.Screen
      name="EventDetailScreen"
      component={EventDetailScreen}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"إختيار المسرحية"} />
      }}
    />

    <Drawer.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"إنشاء حساب"} />
      }}
    />

    <Drawer.Screen
      name="LoginScreen"
      component={LoginAdmin}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"تسجيل الدخول"} />
      }}
    />

    
<Drawer.Screen
      name="FaqScreen"
      component={FaqScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"الاسئلة الشائعة"} />
      }}
    />

    <Drawer.Screen
      name="ContactUsScreen"
      component={ContactUsScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"تواصل معنا"} />
      }}
    />

    <Drawer.Screen
      name="WhoWeAreScreen"
      component={WhoWeAreScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"من نحن"} />
      }}
    />

    <Drawer.Screen
      name="TimeBooking"
      component={TimeBookingScreen}
      options={{
        header: (props) => <HeaderScreenGoBack navigation={navigation} title={"إختيار العرض"} />
    
      }}
    />
   
    <Drawer.Screen
      name="SeatBookingScreen"
      component={SeatBookingScreen}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderBookingSeat navigation={navigation} title={"إختيار تذاكر "} />
      }}
    />


    <Drawer.Screen
      name="BookingDetail"
      component={BookingDetailScreen}
      options={{
    drawerLabel: '',
      }}
    />

    <Drawer.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
    drawerLabel: '',
      }}
    />

    <Drawer.Screen
      name="PillingDetailScreen"
      component={PillingDetailScreen}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"إدخال معلوماتك الشخصية"} />
      }}
    />
    
<Drawer.Screen
      name="PaymentScreen"
      component={PaymentScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"إدخال تفاصيل الدفع"} />
      }}
    />
  
  </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'cover',
    maxHeight: 50,
    maxWidth: 170,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
    padding: 4
  },
  font: {
    fontFamily: FONTFAMILY.cairo
  },
  fontTajwal: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_16,
  },
  button: {
    backgroundColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.BlackTheme,
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 1,
    borderWidth: 2,
    borderColor: COLORS.Grey,
  },
  searchInput: {
    flex: 1,
    color: COLORS.White,
    fontFamily: FONTFAMILY.cairo,
  },

})