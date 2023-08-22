import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {  query , collection , getDocs , db , where   } from "../../../../firebase";
import Entypo from 'react-native-vector-icons/Entypo';


const ManageBookings = ({navigation , route}) => {

  const [error , setError] = useState();
  const [isLoading , setIsLoading] = useState();
  const [bookingsArray , setBookingsArray] = useState([]);
  const [orderArray , setOrderArray] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
  
    const getTimesData = async () => {
      try {
        const q = query(collection(db, "bookings"), where("rel_event_id", "==", route.params.eventId ) );
        const querySnapshot = await getDocs(q);
        const showsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setBookingsArray(showsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getTimesData();
  }, []);

  const handleModelChange = ( order) => {
    setModalVisible(!modalVisible);
   
    setOrderArray(order);
    // navigation.navigate('UserTicketDetail')
  }

  const handleShowBooking = ()=>{
    setModalVisible(!modalVisible);
    navigation.navigate('AdminBookingDetail')
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

        {  /* TOP HEader */}
      <View className="flex flex-row items-center justify-between mt-16" >

      <Image source={require('../../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />

      <TouchableOpacity
      onPress={() => navigation.goBack() }
    >
       <MaterialCommunityIcons
          name="arrow-u-left-top"
          size={26}
          style={[styles.starIcon]}
        />
    </TouchableOpacity>

      </View>
      {  /* TOP HEader */}

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      </ScrollView>
    );
  }



  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar  />

   {  /* TOP HEader */}
      <View className="flex flex-row items-center justify-between mt-16" >

      <Image source={require('../../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />

      <TouchableOpacity
      onPress={() => navigation.goBack() }
    >
       <MaterialCommunityIcons
          name="arrow-u-left-top"
          size={26}
          style={[styles.starIcon]}
        />
    </TouchableOpacity>

      </View>

      
      {  /* TOP HEader */}

    { /* EVENT MANAGE */ }
    <View className="mt-12" >

    <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
    { route.params.eventName}
        </Text>

        

        {bookingsArray && bookingsArray.length !== 0 ? bookingsArray.map(({order , user_name, user_email , user_phone} , index) => (
          

          <View>

          <TouchableOpacity
          onPress={() => handleModelChange(order) }
            className="w-full flex-row justify-around items-center p-4 text-sm rounded-lg bg-gray-800 border border-blue-100 mb-5"
            key={index}
          >
            <View>
              <Text className="text-white text-base" style={styles.font}>
                الاسم: {user_name}
              </Text>
              <Text className="text-green-400 text-base mt-1" style={styles.font}>
                رقم الهاتف : {user_email} 
              </Text>
            </View>

            <View>
            <Image
          source={require('../../../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
            </View>
          </TouchableOpacity>


          <Modal transparent={true} visible={modalVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} >
  <ScrollView contentContainerStyle={styles.scrollContainer}>
  { orderArray && orderArray.map(({category , number , price} , index) => (
          <TouchableOpacity
      onPress={() => navigation.navigate('UserTicketDetail') }
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
      </TouchableOpacity>
        ))}



        </ScrollView>

        </View>

        <View className="flex felx-row items-center" >
      <TouchableOpacity
      className="mt-2 text-center text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
      style={styles.buttonBG}
      onPress={() => handleShowBooking() }>
      <Text style={styles.buttonText}>   تفاصيل الحجز </Text>
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
        ))
        
        : (
          <View className="flex flex-col items-center justify-center mt-16" >
        <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-white font-bold mb-10 text-lg"  >
        لا يوجد حجوزات بعد
        </Text>
        </View>
        ) }





    </View>




    { /* END EVENT MANAGE */ }
    <TouchableOpacity
    className="text-white mt-2 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    paddingHorizontal: 20,
  },
  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },

  starIcon: {
    color: COLORS.DarkGreen,
  },
  icon_logo: {
    width: 150,
    height: 50,
  },
  button: {
    marginBottom: 20,
    backgroundColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    direction: 'rtl',
    width: '100%',
  },
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_4,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,

  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: 120, 
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  font: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: FONTFAMILY.tajawal,
  },
  iconBox: {
    width:50 ,
    height:50,
  },
  boxManage: {
    borderRadius: 20,
    marginTop: 55,
    marginHorizontal: 10,
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
  profileContainer: {
    alignItems: 'center',
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
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonBG: {
    marginBottom: 20,
    backgroundColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
   
  },
 
});

export default ManageBookings;
