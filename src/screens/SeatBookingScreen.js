import  {useState , useEffect, useContext , useCallback} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  AppState 
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {LinearGradient} from 'expo-linear-gradient';
import {  query , collection , getDocs , db , where  , getDoc , doc } from "../../firebase";
import { AuthenticationContext } from '../context/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring 
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const generateSeatsFromData = (data) => {
  const seatsPerRow = Math.floor(Math.sqrt(data.length)); // Calculate seats per row (you can adjust this logic)
  const seatRows = [];
  let currentRow = [];
  data.forEach((ticket, index) => {
    const { ticket_seat, ticket_category, ticket_price, rel_event_id, ticket_offer } = ticket;

 
    const seatObject = {
      number: ticket_seat,
      taken: true, // or use a property from the ticket object if available
      selected: false,
      ticket_category: ticket_category,
      ticket_price: ticket_price,
      rel_event_id: rel_event_id,
      ticket_offer: ticket_offer,
    };

    currentRow.push(seatObject);

    // If the current row is full or it's the last seat, add it to the seatRows array
    if (currentRow.length === seatsPerRow || index === data.length - 1) {
      seatRows.push(currentRow);
      currentRow = [];
    }
  });

  return seatRows;
};

const SeatBookingScreen = ({navigation, route}) => {

  const [movieData, setMovieData] = useState(null);

  const { isAuthenticated  , addOrder  , success  , error  ,setError , orderId} = useContext(AuthenticationContext);

  const { setPackagedTickets } = useContext(AppContext);



  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const [isLoading , setIsLoading] = useState();
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [price, setPrice] = useState(0);
  const [ ticketsArray , setTicketsArray ] = useState([]);
  const [twoDSeatArray, setTwoDSeatArray] = useState([]);
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [showModel , setShowModel] = useState(false);

  // Function to handle seat selection
  const selectSeat = (index, subindex, num, category, price) => {
    const selectedSeat = twoDSeatArray[index][subindex];
  
    if (selectedSeat.taken) {
      const updatedTwoDSeatArray = [...twoDSeatArray];
      const updatedSeat = { ...selectedSeat };
      updatedSeat.selected = !updatedSeat.selected;
      updatedSeat.category = category;
      updatedSeat.price = price;
      updatedTwoDSeatArray[index][subindex] = updatedSeat;
  
      let updatedSelectedSeatArray = [...selectedSeatArray];
      const seatIndex = updatedSelectedSeatArray.findIndex((seat) => seat.number === num);
  
      if (seatIndex === -1) {
        updatedSelectedSeatArray.push({ number: num, category, price });
      } else {
        updatedSelectedSeatArray.splice(seatIndex, 1);
      }
  
      setTwoDSeatArray(updatedTwoDSeatArray);
      setSelectedSeatArray(updatedSelectedSeatArray);
      setPrice(updatedSelectedSeatArray.length * price);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedSelectedSeatArray = [...selectedSeatArray];
    const removedItem = updatedSelectedSeatArray.splice(index, 1)[0];
 
    // Reset any associated changes for the removed item
    const { number, category, price } = removedItem;
    const seat = twoDSeatArray.flat().find((seat) => seat.number === number);
   
    
    if (seat) {
      seat.selected = false;
      seat.category = "";
      seat.price = 0;
    }
    
    setTwoDSeatArray([...twoDSeatArray]); // Update the twoDSeatArray to reflect the changes
    setSelectedSeatArray(updatedSelectedSeatArray);
    setPrice(updatedSelectedSeatArray.length * price); // Recalculate the price
  };

  const getTicketsData = async () => {
    try {
      const q = query(
        collection(db, "tickets"),
        where("rel_event_id", "==", route.params.eventId),
        where("ticket_offer", "==", route.params.timeId)
      );
      const querySnapshot = await getDocs(q);
      const showsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTicketsArray(showsData);
      setTwoDSeatArray(generateSeatsFromData(showsData));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
   useCallback(() => {
      setIsLoading(true);
      getTicketsData();
    }, [route.params.eventId])
  );

  const [userId, setUserId] = useState('');
  const [fullName,setFullName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [userEmail, setEmail] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('trendpr_user');
        let jsonPrsed = JSON.parse(value);
        setUserId(jsonPrsed.id);
        setFullName(jsonPrsed.full_name);
        setPhoneNumber(jsonPrsed.phone_number);
        setEmail(jsonPrsed.email);

      } catch (error) {
        
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      const docRef = doc(db, "events", route.params.eventId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovieData(docSnap.data());
        } else {
          setMovieData(null)
        }
    }
    getInfoFromFireStore();
  } , [route.params.eventId]);


  const addOrderButton = () => {
    setIsLoading(true);
    if (selectedSeatArray.length !== 0) {
      let order =  addOrder( userId , fullName , phoneNumber , userEmail  , price , selectedSeatArray , route.params.eventId  , () => {
        navigation.navigate('BookingDetail');
       });
    }
    else {
      setError("يرجى أختيار تذاكر")
    }
  

   
  
    
  }

  const handleBookingGuest = () => {
    setPackagedTickets([
      {
        'event_name': movieData?.event_name,
        'event_date': movieData?.event_date,
        'event_category': movieData?.event_category,
        'event_id' : route.params.eventId
      },
      selectedSeatArray
    ]);

    navigation.navigate('PillingDetailScreen');
  }
  
  const scale = useSharedValue(0.4); // Set the initial scale to 0.4
const positionX = useSharedValue(0);
const positionY = useSharedValue(0);

const pinchHandler = useAnimatedGestureHandler({
  onStart: (_, ctx) => {
    // Store the initial scale value
    ctx.scale = scale.value;
  },
  onActive: (event, ctx) => {
    // Update the scale value based on the gesture
    scale.value = event.scale * ctx.scale;
  },
});

  // Gesture handler for pan (drag) gesture
  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // Store the initial position
      ctx.translationX = positionX.value;
      ctx.translationY = positionY.value;
    },
    onActive: (event, ctx) => {
      // Update the position based on the gesture
      positionX.value = event.translationX + ctx.translationX;
      positionY.value = event.translationY + ctx.translationY;
    },
  });

  // Animated style for the red square
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      { scale: scale.value },
    ],
  }));
  const zoomIn = () => {
    scale.value = withSpring(scale.value + 0.1, { damping: 2, stiffness: 70 }); // Adjust the damping and stiffness to your preference
  };

  const zoomOut = () => {
    scale.value = withSpring(scale.value - 0.1, { damping: 2, stiffness: 70 }); // Adjust the damping and stiffness to your preference
  };



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
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      { /*  END IMAGE BACKGROUND */ }

    {twoDSeatArray.length !== 0 ? (
      <View>
      { /*   SEAT CONTAINER */ }

      <View style={styles.seatContainer}>
      <View style={styles.containerGap20}>

      {error && (
          <View className=" p-4  text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-emd" >
            <Text style={[styles.errorText , styles.whiteFont]} className="text-white" >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}   >{success}</Text>
          </View>
        )}
        <View className="flex-col flex items-center justify-center "  >

        <Text style={styles.font} className="block text-white font-bold mt-8 mb-6 text-xl"  >
      {route.params?.eventName}
        </Text>

        <Text className="text-white text-base mb-1" style={styles.font} > المسرح </Text>
        <Text className="text-white text-base mb-5" style={styles.font} > STAGE </Text>
        <ScrollView  >

        <View className="w-96"  style={styles.stageBorer}>
        <GestureHandlerRootView style={{ flex: 1 }} className="relative" >
      <PanGestureHandler
        onGestureEvent={panHandler}
        minPointers={1}
        maxPointers={1}
      >
        <Animated.View style={{ flex: 1 }}>
          <PinchGestureHandler
            onGestureEvent={pinchHandler}
            minPointers={2}
            maxPointers={2}
          >
            
            <Animated.View
                style={[
                  {
                    maxHeight: 270,
                    width: '100%',
                    alignSelf: "center",
                  },
                  animatedStyle,
                ]}
              >

      <View style={styles.stageContainer} >
      {twoDSeatArray.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.stageRow}>
          {row.map((seat, seatIndex) => (
            <TouchableOpacity
              key={seatIndex}
              onPress={() => {
                selectSeat(
                  rowIndex,
                  seatIndex,
                  seat.number,
                  seat.ticket_category,
                  seat.ticket_price
                );
              }}
              style={[
                styles.stageSeat,
               { padding: 5} ,
                {
                  backgroundColor: seat.selected ? '#12a591' : 'transparent',
                  borderColor:
                    seat.ticket_category === 'bronze'
                      ? '#CD7F32'
                      : seat.ticket_category === 'silver'
                      ? '#4FC3F7'
                      : seat.ticket_category === 'gold'
                      ? '#FFD700'
                      : seat.ticket_category === 'vip'
                      ? '#E91E63'
                      : seat.ticket_category === 'platinum'
                      ? '#7B1FA2'
                      : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.stageSeatText,
                  {
                    color: seat.selected ? 'white' : 'white',
                  },
                ]}
              >
                {seat.number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

   


    </View>

              </Animated.View>

          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>

      <View className="absolute top-0 left-2" >
      <TouchableOpacity onPress={zoomIn} style={styles.circleButton}  >
          <FontAwesome name="plus" size={12} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut} style={styles.circleButton} className="mt-3"  >
          <FontAwesome name="minus" size={12} color="white" />
        </TouchableOpacity>
      </View>

    </GestureHandlerRootView>


  </View>
        </ScrollView>
      </View>
</View>
        <View style={styles.seatRadioContainer}>
         
          <View style={styles.radioContainer}>
          <Text style={styles.radioText}> مأخوذة </Text>
            <Fontisto
              name="checkbox-passive"
              style={[styles.radioIcon, {color: COLORS.Grey}]}
            />
           
          </View>
          <View style={styles.radioContainer}>
          <Text style={styles.radioText}> تم الاختيار </Text>
            <Fontisto
              name="checkbox-passive"
              style={[styles.radioIcon, {color: COLORS.DarkGreen}]}
            />
          
          </View>
        </View>
      </View>

      { /*  END SEAT CONTAINER */ }
      { /*  BUTTON CONTAINER */ }

      <View style={styles.buttonPriceContainer}>
        
        {isAuthenticated ? (

          isLoading ? (
            <View  >
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
          ) : (
            <TouchableOpacity className="px-2 py-2" style={styles.button} onPress={
  () => addOrderButton()
        }>
          <Text style={styles.buttonText}> شراء التذاكر </Text>
        </TouchableOpacity>
          )

        ) : (
          <TouchableOpacity className="px-2 py-2" style={styles.button} onPress={() => {
            handleBookingGuest()
        }}>
          <Text style={styles.buttonText}> شراء التذاكر </Text>
        </TouchableOpacity>
        )}
     
        <View style={styles.priceContainer}>
          <Text style={styles.price}> {price}.00 دينار </Text>
        </View>

        
      </View>

      <View className="mt-2 mx-8 mb-6" >
      <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setShowModel(!showModel) }>
          <Text style={styles.buttonText}>   اضغط لمشاهدة التذاكر المختارة </Text>
        </TouchableOpacity>

      </View>
    
     { /* model CONTAINER */ }

     <Modal visible={showModel} transparent={true}>
        <View style={styles.modalContainer}>

        <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

        {selectedSeatArray && selectedSeatArray.map((item , index) => (
          <View key={index} className="flex flex-row items-center justify-between mt-3" >
     
        <View style={styles.font} className="bg-gray-200 rounded-lg text-white p-2" >
        <Text style={styles.font} > {item.price} د.ك </Text>
         </View>


         <View className="flex flex-row items-center" >
        

        <Text className="text-white mx-2 text-base" style={styles.font}  > {capitalizeFirstLetter(item.category)} </Text>
        <View
  style={[
    styles.font,
    {
      backgroundColor:
        item.category === 'bronze'
          ? '#CD7F32'
          : item.category === 'silver'
          ? '#4FC3F7'
          : item.category === 'gold'
          ? '#FFD700'
          : item.category === 'vip'
          ? '#E91E63'
          : item.category === 'platinum'
          ? '#7B1FA2'
          : '#12a591',
          color: 'white',
    },
  ]}
  className="rounded-lg text-white p-2"
>
        <Text style={styles.font} > {item.number}  </Text>
         </View>
         <View className="mx-1" >
         <TouchableOpacity onPress={() => handleRemoveItem(index)}>
         <AntDesign
         
         name="close"
         color={COLORS.White}
         size={FONTSIZE.size_24}
       />
         </TouchableOpacity>
         </View>
        

        </View>
         </View>
        ))  }
     

            </ScrollView>
          </View>
          {/* Button to close modal */}
          <TouchableOpacity
        className="mt-8 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => setShowModel(!showModel) }>
          <Text style={styles.buttonText}>   اغلاق </Text>
        </TouchableOpacity>
        </View>
      </Modal>

     { /* END model CONTAINER */ }
  

   
</View>
    ) : (
      <View className="mx-6 mt-2 flex items-center justify-center h-96" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-lg"  >
      لم نعثر على اي تذاكر 
      </Text>

      <TouchableOpacity
      className="mt-5 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>  الرجوع  ْ</Text>
      </TouchableOpacity>
    </View>
    )}
     



      { /*  END BUTTON CONTAINER */ }
    </ScrollView>
  );
};

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
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_10,
  },
  containerGap20: {
    gap: SPACING.space_10,
  },
  seatRow: {
    
    flexDirection: 'row',
    gap: SPACING.space_18,
    marginBottom: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },

  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },

  stageBorer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.Grey,
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: 10,
    paddingVertical: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    
  },
  font: {
    fontFamily: FONTFAMILY.cairo_bold
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
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
  
  },
  whiteFont: {
    color: 'white',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  seatRow: {
    
    flexDirection: 'row',
    gap: SPACING.space_18,
    marginBottom: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  stageContainer: {
    flexDirection: 'column', 
  },
  stageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust this as needed to control spacing between seats
    marginBottom: 10, // Add spacing between rows
  },
  stageSeat: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageSeatText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  circleButton: {
    backgroundColor: COLORS.DarkGreen, 
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: COLORS.White,
    padding: 3,
  },

});

export default SeatBookingScreen;
