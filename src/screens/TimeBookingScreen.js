import  {useContext, useState , useEffect , useCallback } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image ,
  ActivityIndicator,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {LinearGradient} from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { AdminContext } from '../context/AdminContext';
import {  query , collection , getDocs , db , where } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';



const TimeBookingScreen = ( {navigation, route} ) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId , setSelectedId] = useState('');

  useFocusEffect(
    useCallback(() => {

      setSelectedId('');
      setSelectedItem(null);

      const getTimesData = async () => {
        try {
          setIsLoading(true);
          const q = query(collection(db, "shows"), where("rel_event_id", "==", route.params.eventId ) );
          const querySnapshot = await getDocs(q);
          const showsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         
          setShowsArray(showsData);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
        
      };
    
      getTimesData();
  
    
    }, [route.params.eventId])
  );
 

  const handleSelectItem = (index , id) => {
    setSelectedId(id);
    if (selectedItem === index) {
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  
  };


  const [error , setError] = useState();
  const [isLoading , setIsLoading] = useState();
  const [ showsArray , setShowsArray ] = useState([]);
  const { convertDateToArabic , convertTimeToHourMinuteString } = useContext(AdminContext);


  if (
    isLoading
  ) {
    return (
      <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}>
    
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
      </View>
    </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
    <StatusBar barStyle={'light-content'} />

      { /*  IMAGE BACKGROUND */ }
      <View>
        <ImageBackground
          source={{uri: route.params?.BgImage}}
          style={styles.ImageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            
          </LinearGradient>
        </ImageBackground>
       
      </View>

      { /*  END IMAGE BACKGROUND */ }

    <View className="mt-8 mx-6" >

    <Text style={styles.font} className="block text-white font-bold mt-8 mb-6 text-xl"  >
      {route.params?.eventName}
        </Text>

    <Text style={styles.font} className="block text-white font-bold mt-2 mb-6 text-xl"  >
    اختر العرض 
        </Text>

    {showsArray && showsArray.length !== 0 ? showsArray.map(({ show_status , show_time , show_date , show_start_time , show_end_time , id } , index) => (

      <TouchableOpacity onPress={() => handleSelectItem(index , id) } key={index} >
      <View className="w-full flex-row justify-around items-center p-4  text-sm rounded-lg  bg-gray-800 border border-blue-100 mb-8" >
      <View>


      <Text className="text-white text-lg" style={styles.font} > 
        {convertDateToArabic(show_date)}
        </Text>
 
        <Text className="text-blue-500 mt-1 text-lg" style={styles.font} > 
          
          {convertTimeToHourMinuteString(show_start_time)} الى {convertTimeToHourMinuteString(show_end_time)}
        </Text>

          <Text className="text-green-500 text-lg mt-1" style={styles.font} >  {show_status == "true" ? "متاح" : "غير متاح" } </Text>
       
      </View>

      <View style={styles.checkboxForm}>
            {selectedItem === index && (
              <Ionicons name="checkmark-done" size={18} color={COLORS.DarkGreen} style={styles.checkmark} />
            )}
          </View>

      </View>
      </TouchableOpacity>

      ))  : (
        <View>
        <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-white font-bold mb-10 text-lg"  >
        لا يوجد عروض بعد  
        </Text>

        <TouchableOpacity
        className="mt-3 text-white py-1 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2 flex items-center mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>  الرجوع  </Text>
        </TouchableOpacity>

      </View>
      )}

    </View>
    

    <View className="flex items-center text-center" >
              
          {selectedId !== '' && showsArray.length !== 0 && (
            <TouchableOpacity
          className="text-white text-center py-2 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mr-2 mb-2 w-56"
            style={styles.buttonBG}
            onPress={() => {
              navigation.dispatch(
                  DrawerActions.jumpTo('SeatBookingScreen', {
                BgImage: route.params.BgImage,
                PosterImage: route.params.PosterImage,
                eventId: route.params.eventId,
                eventName: route.params.eventName,
                timeId: selectedId
              })
                );
            }}>
            <Text style={styles.buttonText}>  شراء التذاكر </Text>
          </TouchableOpacity>
          )}
         
        </View>


     
    </ScrollView>
  );

}


const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  font: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: FONTFAMILY.tajawal,
  },
  starIcon: {
    color: COLORS.DarkGreen,
  },
  checkboxForm:{
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 500,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buttonBG: {
    marginBottom: 20,
    backgroundColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.DarkGreen,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
 });


export default TimeBookingScreen