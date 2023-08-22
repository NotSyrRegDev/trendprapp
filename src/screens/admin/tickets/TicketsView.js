import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {  query , collection , getDocs , db , where } from "../../../../firebase";
import { AdminContext } from '../../../context/AdminContext';

const TicketsView = ({navigation , route}) => {

  const [isLoading , setIsLoading] = useState();
  const [ ticketsArray , setTicketsArray ] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const { deleteRecord , success , error , setError } = useContext(AdminContext);

  const handleModal = (  id ) => {
    setModalVisible(!modalVisible);
    setEditId(id);
    }
  
  
  useEffect(() => {
    setIsLoading(true);
  
    const getTicketsData = async () => {
      try {
        const q = query(collection(db, "tickets"), where("rel_event_id", "==", route.params.eventId ) , where("ticket_offer" , "==" , route.params.offerId  ) );
        const querySnapshot = await getDocs(q);
        const showsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
        setTicketsArray(showsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getTicketsData();
  }, [ticketsArray]);

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

        <View className="flex flex-col mt-2" >

              {ticketsArray && ticketsArray.length !== 0 ?
          ticketsArray.map(({ ticket_category, ticket_price, ticket_seat , id } , index) => (
    <TouchableOpacity
   onPress={() => handleModal(id) }
      className="w-full flex-row justify-around items-center p-4 text-sm rounded-lg bg-gray-800 border border-blue-100 mb-5"
      key={index}
    >
      <View>
        <Text className="text-white text-lg" style={styles.font}>
          المقعد: {ticket_seat}
        </Text>
        <Text className="text-green-400 text-lg mt-1" style={styles.font}>
          السعر : {ticket_price} د.ك
        </Text>
      </View>

      <View>
            <Entypo
        name="ticket"
        size={34}
        style={
          ticket_category === 'bronze'
            ? { color: '#CD7F32' } // Bronze color
            : ticket_category === 'silver'
            ? { color: '#4FC3F7' } // Silver color
            : ticket_category === 'gold'
            ? { color: '#FFD700' } // Gold color
            : ticket_category === 'vip'
            ? { color: '#E91E63' } // VIP color
            : ticket_category === 'platinum'
            ? { color: '#7B1FA2' } // Platinum color
            : null
        }
      />
      </View>
    </TouchableOpacity>
  )) : (
    <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-white font-bold mb-10 text-lg"  >
        لا يوجد تذاكر بعد
        </Text>
  )}

       
        <TouchableOpacity
        className="mt-3 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>  الرجوع  </Text>
        </TouchableOpacity>
      

        </View>



    </View>


    <Modal transparent={true} visible={modalVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} >

  {error && (
          <View className=" p-4 text-sm text-white rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4 text-sm text-white rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}
      
          <View className="flex felx-row items-center justify-center" >
          <Text className="text-white text-center text-lg mb-5" style={styles.font} > الاجرائات على التذكرة  </Text>
          
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-green-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() =>  {
            setModalVisible(!modalVisible);
            navigation.navigate('EditTicket' , {
    editId : editId,
    eventId : route.params.eventId,
    eventName : route.params.eventName
   });


          } }>
          <Text style={styles.buttonText}>   تعديل التذكرة   </Text>
        </TouchableOpacity>

      <TouchableOpacity
        className="mt-4 text-center text-white py-3 bg-red-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => {
            deleteRecord("tickets" , editId);
          } }>
          <Text style={styles.buttonText}>   حذف التذكرة   </Text>
        </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-4 text-center text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text style={styles.buttonText}>   اغلاق </Text>
        </TouchableOpacity>
        
      </View>

  </View>

 

</View>
  

</Modal>


    { /* END EVENT MANAGE */ }

    
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
  starIcon: {
    color: COLORS.DarkGreen,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
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
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
 
});

export default TicketsView;
