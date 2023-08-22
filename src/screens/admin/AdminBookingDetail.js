import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';
  import React , {useRef} from 'react'
  import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
  import AppHeader from '../../components/AppHeader';
  import {LinearGradient} from 'expo-linear-gradient';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import Octicons from 'react-native-vector-icons/Octicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { captureRef } from 'react-native-view-shot';
  import * as MediaLibrary from 'expo-media-library';
  
  
  const AdminBookingDetail = ({navigation, route}) => {
  
    const outputViewRef = useRef();
  
    const handleButtonClick = async () => {
      try {
        const uri = await captureRef(outputViewRef, {
          format: 'png', // Set the format of the captured image
          quality: 0.8, // Set the quality of the captured image (0.0 - 1.0)
        });
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.saveToLibraryAsync(asset);
  
      
  
      } catch (error) {
       
      }
    };
    
    return (
      <SafeAreaView
      style={styles.container}
  >
      <StatusBar hidden />
  
      <ScrollView >
  
      { /* TOP IMAGEBACKGROUNDWIth CArd */ }
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
                  action={() => navigation.navigate('AdminDashboard')}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
         
        </View>
  
        { /* End TOP IMAGEBACKGROUNDWIth CArd */ }
  
        { /* Succefuol Booking View*/ }
  
        <View className="flex items-center mt-5 " ref={outputViewRef} >
  
        <Image source={require('../../assets/icons/check.png')} style={styles.logo} />
          <Text style={styles.title}>  تمت عملية الحجز بنجاح </Text>
  
        <View className="mt-16" >
  
  
        { /*   Booking Qr Code*/ }
  
        <View className="" >
      <Text style={styles.font} className="text-right block text-white font-bold mb-2 text-xl"  >
          معلومات الحجز
          </Text>
          <View className="flex flex-col items-end mt-3" >
  
          {/* <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
              <Text style={styles.errorText} className="mx-1"  >    الباركود  </Text>
  
              <AntDesign
            name="barcode"
            size={26}
            style={[styles.starIcon]}
          />
            </View> */}
  
          <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
  
         
          <Text style={[styles.errorText , styles.bookingHeadline]}   >     R123421 </Text>
          <Text style={styles.errorText} className="mx-1"  >    رقم الطلب : </Text>
        
  
              <Octicons
            name="number"
            size={26}
            style={[styles.starIcon]}
          />
  
          
            </View>
  
            <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
            <Text style={[styles.errorText , styles.bookingHeadline]}   >     L12 </Text>
            <Text style={styles.errorText} className="mx-1"  >   المقعد : </Text>
            <MaterialCommunityIcons
            name="seat"
            size={26}
            style={[styles.starIcon]}
          />
             
            </View>
  
            <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
            <Text style={[styles.errorText , styles.bookingHeadline]}   >     Paylap </Text>
            <Text style={styles.errorText} className="mx-2"  >   طريقة الدفع : </Text>
            <MaterialIcons
            name="payment"
            size={26}
            style={[styles.starIcon]}
          />
             
            </View>
  
            <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
            <Text style={[styles.errorText , styles.bookingHeadline]}   >     15 د.ك </Text>
            <Text style={styles.errorText} className="mx-2"  >   المبلغ الكلي : </Text>
            <MaterialIcons
            name="attach-money"
            size={26}
            style={[styles.starIcon]}
          />
             
            </View>
  
          </View>
  
        
  
  
      </View>
  
  
  
        { /*   Booking Qr Code*/ }
  
        { /*   Booking Detials*/ }
     
  <View className="mt-8 mb-5" >
  <TouchableOpacity
      className="w-80 h-16 py-2 border border-white rounded-lg text-white bg-transparent flex-row items-center justify-center"
        onPress={() => navigation.navigate('HomeScreen') }>
         <Text style={styles.buttonText} className="px-2" > إجراء حجز جديد </Text>
          <MaterialIcons name="radio" style={styles.radioIcon} />
      </TouchableOpacity>
  </View>
  
  <View className="mb-5" >
  <TouchableOpacity
      className="w-80 h-16 py-2 border border-white rounded-lg text-white bg-transparent flex-row items-center justify-center"
      onPress={handleButtonClick} >
         <Text style={styles.buttonText} className="px-2" >  تحميل تفاصيل الحجز </Text>
          <MaterialIcons name="file-download" style={styles.radioIcon} />
      </TouchableOpacity>
  </View>
  
  
  
    { /* End  Booking Detials*/ }
  
        </View>
  
        </View>
  
        { /* End Succefuol Booking View*/ }
        
      </ScrollView>
  
   
  
    
  
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    
    loadingContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    scrollViewContainer: {
      flex: 1,
    },
   
    imageBG: {
      width: '100%',
      aspectRatio: 3072 / 1727,
    },
   
    cardImage: {
      width: '60%',
      aspectRatio: 200 / 300,
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
    },
    starIcon: {
      color: COLORS.DarkGreen,
    },
    bookingHeadline: {
      color: COLORS.DarkGreen,
    },
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
    logo: {
      resizeMode: 'contain',
      height: 80,
      width: 80,
      alignSelf: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: FONTFAMILY.tajawal_bold,
      color: 'white',
      marginTop: 35,
      textAlign: 'center',
    },
    subtitle: {
      fontFamily: FONTFAMILY.tajawal_light,
      fontSize: 18,
      color: 'white',
      marginTop: 25,
      textAlign: 'center',
    },
    buttonText: {
      fontFamily: FONTFAMILY.tajawal_bold,
      fontSize: 16,
      fontWeight: 'bold',
      
      color: 'white',
      textAlign: 'center',
    },
    radioIcon: {
      fontSize: FONTSIZE.size_20,
      color: COLORS.White,
    },
    font: {
      fontWeight: 'bold',
      textAlign: 'right',
      fontFamily: FONTFAMILY.tajawal,
    },
    errorText: {
      fontFamily: FONTFAMILY.cairo_bold,
      textAlign: 'right',
      color: COLORS.White
    },
  });
  
  export default AdminBookingDetail