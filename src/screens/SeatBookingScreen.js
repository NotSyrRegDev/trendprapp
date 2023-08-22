import  {useState , useEffect, useContext} from 'react'
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
  Modal
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {  query , collection , getDocs , db , where } from "../../firebase";
import { AuthenticationContext } from '../context/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


const generateSeatsFromData = (data) => {
  let rowArray = [];
  let currentRow = [];
  let currentRowNumber = null;
  let numColumn = 0;

  data && data.forEach((ticket) => {
    const { ticket_seat, ticket_category , ticket_price , rel_event_id  , ticket_offer } = ticket;
    const rowNumber = ticket_seat.substring(0, 2);

    if (rowNumber !== currentRowNumber) {
      if (currentRow.length > 0) {
        rowArray.push(currentRow);
        currentRow = [];
      }
      currentRowNumber = rowNumber;
      numColumn = 1;
    }

    const seatObject = {
      number: ticket_seat,
      taken: true, // or use a property from the ticket object if available
      selected: false,
      ticket_category: ticket_category,
      ticket_price: ticket_price,
      rel_event_id: rel_event_id,
      ticket_offer: ticket_offer
    };

    currentRow.push(seatObject);
    numColumn++;
  });

  if (currentRow.length > 0) {
    rowArray.push(currentRow);
  }

  return rowArray;
};

const SeatBookingScreen = ({navigation, route}) => {

  const { isAuthenticated  , addOrder  , success  , error  ,setError , orderId} = useContext(AuthenticationContext);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const [isLoading , setIsLoading] = useState();
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [price, setPrice] = useState(0);
  const [ ticketsArray , setTicketsArray ] = useState([]);
  const [twoDSeatArray, setTwoDSeatArray] = useState([]);
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState();
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
    console.log(removedItem);
    
    // Reset any associated changes for the removed item
    const { number, category, price } = removedItem;
    
    const seat = twoDSeatArray.flat().find((seat) => seat.number === number);
    console.log(twoDSeatArray);
    console.log(seat);
    
    if (seat) {
      seat.selected = false;
      seat.category = "";
      seat.price = 0;
    }
    
    setTwoDSeatArray([...twoDSeatArray]); // Update the twoDSeatArray to reflect the changes
    setSelectedSeatArray(updatedSelectedSeatArray);
    setPrice(updatedSelectedSeatArray.length * price); // Recalculate the price
  };

  useEffect(() => {
    setIsLoading(true);
  
    const getTicketsData = async () => {
      try {
        const q = query(collection(db, "tickets"), where("rel_event_id", "==", route.params.eventId ) , where("ticket_offer" , "==" , route.params.timeId  ) );
        const querySnapshot = await getDocs(q);
        const showsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setTicketsArray(showsData);
        setTwoDSeatArray(generateSeatsFromData(showsData));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getTicketsData();
  }, []);

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
          console.log(error);
      }
    };

    getData();
  }, []);


  const addOrderButton = () => {
   let order =  addOrder( userId , fullName , phoneNumber , userEmail  , price , selectedSeatArray , route.params.eventId );
   
    setTimeout(() => {
      if (selectedSeatArray.length !== 0) {
      navigation.push('BookingDetail');
    }
     }, 2500);
  
    
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
          source={{uri: route.params?.BgImage}}
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


  {twoDSeatArray  &&  twoDSeatArray.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.seatRow}>
      {row.map((seat, seatIndex) => {
       
        return (
          <TouchableOpacity
  key={seatIndex}
  onPress={() => {
    selectSeat(rowIndex, seatIndex, seat.number, seat.ticket_category , seat.ticket_price );
  }}
>

  <MaterialIcons
    name="event-seat"
    style={[
      styles.seatIcon,
      {
        color: seat.selected ? '#12a591' : (
          seat.ticket_category === 'bronze' ? '#CD7F32' :
          seat.ticket_category === 'silver' ? '#4FC3F7' :
          seat.ticket_category === 'gold' ? '#FFD700' :
          seat.ticket_category === 'vip' ? '#E91E63' :
          seat.ticket_category === 'platinum' ? '#7B1FA2' :
          null
        )
      }
    ]}
  />
</TouchableOpacity>
        );
      })}
    </View>
  )) }
</View>
        <View style={styles.seatRadioContainer}>
          {/* <View style={styles.radioContainer}>
          <Text style={styles.radioText}> متوفرة </Text>
            <MaterialIcons name="event-seat" style={styles.radioIcon} />
          
          </View> */}
          <View style={styles.radioContainer}>
          <Text style={styles.radioText}> مأخوذة </Text>
            <MaterialIcons
              name="event-seat"
              style={[styles.radioIcon, {color: COLORS.Grey}]}
            />
           
          </View>
          <View style={styles.radioContainer}>
          <Text style={styles.radioText}> تم الاختيار </Text>
            <MaterialIcons
              name="event-seat"
              style={[styles.radioIcon, {color: COLORS.DarkGreen}]}
            />
          
          </View>
        </View>
      </View>

      { /*  END SEAT CONTAINER */ }
      { /*  BUTTON CONTAINER */ }

      <View style={styles.buttonPriceContainer}>
        
        {isAuthenticated ? (
          <TouchableOpacity className="px-2 py-2" style={styles.button} onPress={
  () => addOrderButton()
        }>
          <Text style={styles.buttonText}> شراء التذاكر </Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity className="px-2 py-2" style={styles.button} onPress={() => {
          navigation.push('LoginScreen');
        }}>
          <Text style={styles.buttonText}> شراء التذاكر </Text>
        </TouchableOpacity>
        )}
     
        <View style={styles.priceContainer}>
          <Text style={styles.price}> {price}.00 دينار </Text>
        </View>
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
         <View style={styles.font} className="bg-green-500 rounded-lg text-white p-2" >
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
  

      <View className="mt-2" >
      <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setShowModel(!showModel) }>
          <Text style={styles.buttonText}>   اضغط لمشاهدة التذاكر المختارة </Text>
        </TouchableOpacity>

      </View>
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
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
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
  }

});

export default SeatBookingScreen;
