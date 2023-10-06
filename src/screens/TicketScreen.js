import  { useState , useEffect , useCallback} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Modal,
  FlatList,
  RefreshControl
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {  query , collection , getDocs , db , where  , getDoc , doc } from "../../firebase";
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubMovieCard from '../components/SubMovieCard';
import CategoryHeader from '../components/CategoryHeader';
import { useFocusEffect } from '@react-navigation/native';



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

  const getBookingsData = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'bookings'));
      const querySnapshot = await getDocs(q);

      const bookingsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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

      setTicketsArray(updatedBookingsData);
    } catch (error) {
      // Handle error, if needed
    } finally {
      setIsLoading(false);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getBookingsData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
      getBookingsData();
      setIsLoading(true);
    }, 2000);
  };
  

 
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
      <StatusBar barStyle={'light-content'} />

      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
      </View>
    </ScrollView>
    );
  }

  return (

    <ScrollView
  style={{backgroundColor:COLORS.Black }}
      refreshControl={
        <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="white" 
    />
        }
    >

    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'light-content'} />

    <View className="mt-8 mx-6" >
   
    {ticketsArray && ticketsArray.length !== 0 ?
        (
          <View   >
          <CategoryHeader title={'التذاكر المحجوزة'} postion="center" />
          <FlatList
  data={ticketsArray}
  keyExtractor={(item) => item.id}
  showsHorizontalScrollIndicator={false}
  bounces={false}
  contentContainerStyle={styles.containerGap16}
  numColumns={2}
  renderItem={({ item, index }) => {
        const { order, eventData } = item;
        return (
          <View key={index}>
            <SubMovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                handleModalShow(order);
              }}
              cardWidth={width / 2.2}
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
        className="mt-2 text-center text-white py-2 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => handleShowDetials() }>
          <Text style={styles.buttonText}>   مشاهدة التفاصيل </Text>
        </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-2 text-center text-white py-2 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2  mb-2 w-full"
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
              navigation.navigate('HomeScreen');
            }}>
            <Text style={styles.buttonText}>  شراء تذاكر جديدة </Text>
          </TouchableOpacity>

    
        </View>


     
    </ScrollView>

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
  containerGap16: {
    gap: SPACING.space_4,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 30,
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


export default TicketScreen