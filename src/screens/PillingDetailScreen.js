import React , {useState , useContext , useEffect , useRef } from 'react';
import {Text, View, StyleSheet, StatusBar, Modal , TouchableOpacity , SafeAreaView ,   TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform ,
  ScrollView
 } from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../theme/theme';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';


const PillingDetailScreen = ({navigation}) => {

  const [showModel , setShowModel] = useState(false);

  const { time , setTime , packagedTickets } = useContext(AppContext);
  const [totalPriceEvent , setToalPriceEvent] = useState(0);
  const { convertDateToArabic  } = useContext(AdminContext);
  
  useEffect(() => {
    const ticketInfo = packagedTickets[1];
    const totalPrice = ticketInfo.reduce((total, ticket) => {
      const ticketPrice = parseInt(ticket.price, 10); // Convert price to a number
      return total + ticketPrice;
    }, 0);

    setToalPriceEvent(totalPrice);
  } , [packagedTickets])




  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(countdownInterval); // Stop the timer when it reaches 00:00
      } else {
        if (time.seconds === 0) {
          setTime({ minutes: time.minutes - 1, seconds: 59 });
        } else {
          setTime({ ...time, seconds: time.seconds - 1 });
        }
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval); // Cleanup when the component unmounts
    };
  }, [time]);

  const [isLoading , setIsLoading] = useState(false);
  const [fullName,setFullName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [userEmail, setEmail] = useState('');
  const [error, setError] = useState('');


  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const maxLength = 10;
    const truncatedText = numericText.slice(0, maxLength);
  
    setPhoneNumber(truncatedText);
  };

  const handleNextStep = () => { 

    if (fullName !== '' && phoneNumber !== '' && userEmail !== ''   ) {
      
      navigation.navigate('PaymentScreen' , {
        fullName,
        phoneNumber,
        userEmail
     
      });
    }else {
      setError("يرجى ادخال جميع الحقول المطلوبة");
      setTimeout(() => {
        setError('');
      } , 3200)
    }
  }
  
  const scrollViewRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <ScrollView    ref={scrollViewRef} >

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

<TouchableOpacity
  className="text-white mt-2 rounded-lg text-sm px-4 py-2 w-48"
    style={styles.button}
    onPress={() => setShowModel(!showModel)  }>
    <Text style={styles.buttonText}>  عرض التذاكر </Text>
  </TouchableOpacity>

</View>

<View className="bg-gray-800 w-full rounded-lg p-3 mb-5" >

<Text style={styles.font} className="text-white mt-3 mb-1 text-lg"  >
أكمل تفاصيل الحجز للمتابعة
</Text>

<KeyboardAvoidingView
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
<View className="mt-10" >

{error && (
        <>
        {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
        <View className=" p-4 text-sm text-white rounded-lg bg-red-500   text-right mb-5 flex items-start" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        </>
         
        )}

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
الاسم الكامل  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >

<TextInput
style={styles.inputStyle}
        placeholderTextColor="#9c9c9c" 
        placeholder="أدخل الاسم الكامل"
id="fullName"
autoCapitalize="none"
value={fullName}
onChangeText={(text) => setFullName(text) }
/>
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
رقم الهاتف  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >

<TextInput
style={styles.inputStyle}
        placeholderTextColor="#9c9c9c" 
        placeholder="أدخل رقم الهاتف"
id="phoneNumber"
autoCapitalize="none"
value={phoneNumber}
onChangeText={handlePhoneNumberChange}
keyboardType="numeric"
/>
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
البريد الالكتروني  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >

<TextInput
style={styles.inputStyle}
        placeholderTextColor="#9c9c9c" 

id="email"
placeholder="أدخل البريد الالكتروني"
textContentType="emailAddress"
keyboardType="email-address"
autoCapitalize="none"
value={userEmail}
onChangeText={(text) => setEmail(text) }
/>
</View>

</View>
{ /*  END SINGLE INPUT */ }

</View>
</KeyboardAvoidingView>

</View>

<View className="bg-gray-800 w-full rounded-lg p-3 mb-5" >

<Text style={styles.font} className="text-white mt-3 mb-1 text-lg"  >
الشروط والأحكام
</Text>

<Text style={styles.font} className="text-white my-1 text-sm"  >
يرجى قراءة شروط وأحكام المنظم والموافقة عليها 
</Text>

  <View className="bg-gray-900 px-4 py-6 flex items-start rounded-lg mt-5" >

  <View className="mb-4 flex-row items-center" >
  <View style={styles.bulletPoint} />
  <Text style={styles.font} className="text-white mx-2 text-sm"  >
  يرجى قراءة شروط وأحكام المنظم والموافقة عليها 
  </Text>
  </View>

  <View className="mb-4 flex-row items-center" >
  <View style={styles.bulletPoint} />
  <Text style={styles.font} className="text-white mx-2 text-sm"  >
    لا يسمح بدخول الأكل والمشروبات بكافة انواعها من خارج كافتريا المسرح
  </Text>
  </View>

  <View className="mb-4 flex-row items-center" >
  <View style={styles.bulletPoint} />
  <Text style={styles.font} className="text-white mx-2 text-sm"  >
    يحتاج جميع الأطفال الذين تبلغ أعمارهم اكثر من
  </Text>
  </View>


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
    onPress={() => handleNextStep()  }>
    <Text style={styles.buttonText}>   المتابعة الى الدفع  </Text>
  </TouchableOpacity>
)}


<TouchableOpacity
  className="text-white mt-5 text-sm px-6 py-4 "
    
    onPress={() => navigation.goBack()  }>
    <Text style={styles.buttonText}>  رجوع  </Text>
  </TouchableOpacity>
</View>



      </View>

      <Modal visible={showModel} transparent={true}>
        <View style={styles.modalContainer}>

        <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

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
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
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
    textAlign: 'right',
    color: 'white',
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

export default PillingDetailScreen;
