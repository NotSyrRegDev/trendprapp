import React , {useState , useContext , useEffect  } from 'react';
import {Text, View, StyleSheet, StatusBar , TouchableOpacity , SafeAreaView , 
  ActivityIndicator,
  ScrollView,
  Modal
 } from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../theme/theme';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import { AuthenticationContext } from '../context/AuthContext';


const PaymentScreen = ({navigation , route}) => {

  const [showModel , setShowModel] = useState(false);
  const [userId, setUserId] = useState('');
  const { addOrder } = useContext(AuthenticationContext);
  const { time  , packagedTickets  } = useContext(AppContext);
  const [totalPriceEvent , setToalPriceEvent] = useState(0);
  const [isLoading , setIsLoading] = useState(false);
  const { convertDateToArabic  } = useContext(AdminContext);


  useEffect(() => {
    const ticketInfo = packagedTickets[1];
    const totalPrice = ticketInfo.reduce((total, ticket) => {
      const ticketPrice = parseInt(ticket.price, 10); // Convert price to a number
      return total + ticketPrice;
    }, 0);

    setToalPriceEvent(totalPrice);
  } , [packagedTickets])

  const makeid = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

  const addOrderButton = () => {
    setIsLoading(true);
   let order =  addOrder( makeid(20) , route.params.fullName , route.params.phoneNumber , route.params.userEmail  , totalPriceEvent ,  packagedTickets[1] , packagedTickets[0].event_id , () => {
    navigation.navigate('BookingDetail');
   } );

    setTimeout(() => {
      navigation.navigate('BookingDetail');
     }, 2500);
     setIsLoading(false);
    
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <ScrollView>

      <View>
      <View  style={styles.appHeaderContainer} >


<View className="flex items-center justify-center rounded-lg p-3 mb-5 mt-8" style={styles.timeButton}  >
<Text style={styles.fontBold} className="text-center text-white text-lg" > أكمل حجزك قبل نفاذ الوقت </Text>
<Text style={styles.fontBold} className="text-center text-white text-lg" > 
{`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}

 </Text>
</View>

<View className="bg-gray-800 w-full rounded-lg p-3 mb-5" >
<Text style={styles.font} className="text-white my-1 text-base"  >
    {packagedTickets[0].event_name}
</Text>
<Text style={styles.font} className="text-white my-1 text-base"  >
   الفئة:  {packagedTickets[0].event_category}
</Text>
<Text style={styles.font} className="text-white my-1 text-base"  >
      تاريخ الفعالية: {convertDateToArabic(packagedTickets[0].event_date)}
</Text>
<Text style={styles.fontBold} className="text-white my-1 text-base text-left"  >
{packagedTickets[1].length} تذاكر ({totalPriceEvent} د.ك)
</Text>



</View>

<View className="bg-gray-800 w-full rounded-lg p-3 mb-5" >

<Text style={styles.font} className="text-white mt-3 mb-1 text-lg"  >
    تفاصيل الحجز
</Text>

  <View className="mt-2" >

  {packagedTickets && packagedTickets[1].map((item , index) => (
          <View key={index} className="flex flex-row items-center justify-between mt-3" >

          <View className="flex flex-row items-center" >
       
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

         <Text className="text-white mx-2 text-base" style={styles.font}  > {capitalizeFirstLetter(item.category)} </Text>

        </View>
     
        <View style={styles.font} className="bg-gray-200 rounded-lg text-white p-2" >
        <Text style={styles.font} > {item.price} د.ك </Text>
         </View>
       
         </View>
        ))  }


  </View>






</View>

<View className="bg-gray-800 w-full rounded-lg p-3 mb-5" >

<Text style={styles.font} className="text-white mt-3 mb-1 text-lg"  >
    اختر طريقة الدفع
</Text>

<View className="px-4 py-2 flex items-start rounded-lg mt-2" >

   
    <TouchableOpacity
        className="mt-3 text-white py-3 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => {}}>
          <Text style={styles.buttonText}>   الدفع باستخدام KNET</Text>
        </TouchableOpacity>

        <TouchableOpacity
        className="mt-4 text-white py-3 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => {}}>
          <Text style={styles.buttonText}>  الدفع بالبطاقة الائتمانية</Text>
        </TouchableOpacity>


    </View>

</View>


</View>

<View className="flex items-center w-full" >

{isLoading ? (
<View  className="flex items-center justify-center" >
    <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
  </View>
) : (
<TouchableOpacity
  className="text-white mt-5 rounded-lg text-sm px-6 py-4 mr-2 mb-2 "
    style={styles.button}
    onPress={() => addOrderButton()  }>
    <Text style={styles.buttonText}>  الدفع الأن </Text>
  </TouchableOpacity>
)}


<TouchableOpacity
  className="text-white mt-5 text-sm px-6 py-2"
    
    onPress={() => navigation.navigate('Tab')  }>
    <Text style={styles.buttonText}>  الغاء الطلب  </Text>
  </TouchableOpacity>
</View>



      </View>

    

      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    direction: 'rtl',
    paddingHorizontal: 25,
  
  },
  appHeaderContainer: {
    marginHorizontal: 25,
    marginTop: SPACING.space_20 * 2,
  },

  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  font: {
    fontFamily: FONTFAMILY.tajawal,
    textAlign: 'left',
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  timeButton: {
    backgroundColor: COLORS.DarkGreen,
  },
  fontBold :{
    fontFamily: FONTFAMILY.tajawal_bold,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right'
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_2,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'right',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    direction: 'rtl',
    width: '100%',
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4, 
    backgroundColor: 'white', 
    marginRight: 5, 
  },
  modalContainer: {
    flex: 1,
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

});

export default PaymentScreen;
