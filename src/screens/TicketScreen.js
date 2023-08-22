import  { useState , useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Modal,
  FlatList
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
import {  query , collection , getDocs , db , where  , getDoc , doc } from "../../firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import CategoryHeader from '../components/CategoryHeader';

const {width, height} = Dimensions.get('window');

const TicketScreen = ( {navigation, route} ) => {

  const [error , setError] = useState();
  const [isLoading , setIsLoading] = useState(true);
  const [ ticketsArray , setTicketsArray ] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [ orderArray  , setOrderArray ] = useState(null)

  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('trendpr_user');
        setUser(JSON.parse(value));
       
      } catch (error) {
       
      }
    };

    getData();
  }, []);

  
  useEffect(() => {
    setIsLoading(true);
  
    const getBookingsData = async () => {
      const q = query(collection(db, 'bookings'));
      const querySnapshot = await getDocs(q);
    
      const bookingsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
      // Retrieve event information for each booking
      const updatedBookingsData = await Promise.all(
        bookingsData.map(async (booking) => {
          const eventId = booking.rel_event_id;
          const eventDocRef = doc(db, 'events', eventId);
          const eventDocSnapshot = await getDoc(eventDocRef);
    
          if (eventDocSnapshot.exists()) {
            return {
              ...booking,
              eventData: eventDocSnapshot.data()
            };
          } else {
            return booking;
          }
        })
      );
      setIsLoading(false);
      console.log(updatedBookingsData)
      setTicketsArray(updatedBookingsData);
    };
  
    getBookingsData();
  }, []);

 
  const handleModalShow = (order) => {

    setModalVisible(!modalVisible);
    setOrderArray(order);
  }

  const handleShowDetials = () => { 
    setModalVisible(!modalVisible);
    navigation.navigate('UserTicketDetail')
   }
  
  


  if (
    isLoading
  ) {
    return (
      <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />

      <View className="flex items-center justify-center mt-2 sticky" >
    <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo} />
    </View>

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
      <StatusBar hidden />

      { /*  IMAGE BACKGROUND */ }
      <View>
        <ImageBackground
          source={{uri: 'https://trend-pr.net/wp-content/themes/TrendTheme/images/movies/5.jpg'}}
          style={styles.ImageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
       
      </View>

      { /*  END IMAGE BACKGROUND */ }

    <View className="mt-8 mx-6" >
   
    {ticketsArray && ticketsArray.length !== 0 ?
        (
          <View   >
          <CategoryHeader title={'المسرحيات التي قمت بحجزها'} />
          <FlatList
      data={ticketsArray}
      keyExtractor={(item) => item.id}
      bounces={false}
      snapToInterval={width * 0.7 + SPACING.space_36}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      contentContainerStyle={styles.containerGap36}
      renderItem={({ item, index }) => {
        const { order, eventData } = item;
        return (
          <View key={index}>
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                handleModalShow(order);
              }}
              cardWidth={width * 0.7}
              isFirst={index === 0}
              title={eventData.event_name}
              imagePath={eventData.event_image}
              vote_average={eventData.event_rating}
              style={{ margin: 40 }}
            />
          </View>
        );
      }}
    />
         

          <Modal transparent={true} visible={modalVisible} animationType="slide">

          <View style={styles.modalContainer} >
            <View style={styles.modalContent} >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            { orderArray && orderArray.map(({category , number , price} , index) => (
              <View
   
      className="w-full flex-row justify-around items-center p-4 text-sm rounded-lg bg-gray-800 border border-blue-100 mb-5"
      key={index}
    >
      <View>
        <Text className="text-white text-lg" style={styles.font}>
          المقعد: {number}
        </Text>
        <Text className="text-green-400 text-lg mt-1" style={styles.font}>
          السعر : {price} د.ك
        </Text>
      </View>

      <View>
            <Entypo
        name="ticket"
        size={34}
        style={
          category === 'bronze'
            ? { color: '#CD7F32' } // Bronze color
            : category === 'silver'
            ? { color: '#4FC3F7' } // Silver color
            : category === 'gold'
            ? { color: '#FFD700' } // Gold color
            : category === 'vip'
            ? { color: '#E91E63' } // VIP color
            : category === 'platinum'
            ? { color: '#7B1FA2' } // Platinum color
            : null
        }
      />
      </View>
    </View>
            ))}

     

            </ScrollView>

            </View>

            <View className="flex felx-row items-center" >
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => handleShowDetials() }>
          <Text style={styles.buttonText}>   مشاهدة التفاصيل </Text>
        </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text style={styles.buttonText}>   اغلاق </Text>
        </TouchableOpacity>
        
      </View>

          </View>
            
        
          </Modal>

          </View>
        )
         : (
    <View className="mt-2 flex items-center justify-center h-96" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-lg"  >
      لم تقم بشراء اي تذاكر بعد
      </Text>

    </View>
  )}
    </View>
    

    <View className="flex items-center mt-5 text-center" >
          <TouchableOpacity
          className="text-white text-center py-2 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mr-2 mb-2 w-56"
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('Tab');
            }}>
            <Text style={styles.buttonText}>  شراء تذاكر جديدة </Text>
          </TouchableOpacity>

    
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
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  containerGap36: {
    gap: SPACING.space_36,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
  },
  modalContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    borderRadius: 10,
    maxHeight: '40%',
    width: '100%',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },

 });


export default TicketScreen