import React, {useContext, useEffect, useState} from 'react';
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
import { AdminContext } from '../../../context/AdminContext';


const ManageTimes = ({navigation , route}) => {

  const [isLoading , setIsLoading] = useState();
  const [ showsArray , setShowsArray ] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const { convertDateToArabic ,convertTimeToHourMinuteString , deleteRecord , error , setError , success } = useContext(AdminContext);
  
  useEffect(() => {
    setIsLoading(true);
  
    const getTimesData = async () => {
      try {
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
  }, []);

  const handleModal = (  id ) => {
   setModalVisible(!modalVisible);
   setEditId(id);
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

        <View className="flex flex-col mt-5" >

      {showsArray && showsArray.length !== 0 ? showsArray.map(({ show_status , show_start_time , show_end_time , show_date , id } , index) => (

        <TouchableOpacity onPress={() => handleModal(id) } key={index} className="w-full flex-row justify-around items-center p-4  text-sm rounded-lg  bg-gray-800 border border-blue-100 mb-5" >
        <View>
          <Text className="text-white text-lg" style={styles.font} > 
          {convertDateToArabic(show_date)}
          </Text>

          <Text className="text-blue-500 mt-1 text-lg" style={styles.font} > 
          
          {convertTimeToHourMinuteString(show_start_time)} الى {convertTimeToHourMinuteString(show_end_time)}
        </Text>

          <Text className="text-green-500 text-lg mt-1" style={styles.font} >  {show_status == "true" ? "متاح" : "غير متاح" } </Text>
        </View>

        <View>
        <Fontisto  name="date"   size={28}    style={[styles.starIcon]}   />
        </View>
        </TouchableOpacity>

      )) : (
        <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-white font-bold mb-10 text-lg"  >
        لا يوجد عروض بعد  
        </Text>
      ) }
        { /* SINGLE ITEM */ }

       
        <TouchableOpacity
        className="mt-3 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.navigate('ِAddTime' , {
          eventId: route.params.eventId,
          eventName: route.params.eventName
        })}>
          <Text style={styles.buttonText}> إضافة عرض </Text>
        </TouchableOpacity>

        <TouchableOpacity
    className="text-white mt-2 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>
      

        </View>



    </View>




    { /* END EVENT MANAGE */ }

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
          <Text className="text-white text-center text-lg mb-5" style={styles.font} > الاجرائات على العرض  </Text>
          
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-green-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() =>  {
            setModalVisible(!modalVisible);
            navigation.navigate('ِEditTime' , {
    editId : editId,
    eventId : route.params.eventId,
    eventName : route.params.eventName
   });


          } }>
          <Text style={styles.buttonText}>   تعديل العرض   </Text>
        </TouchableOpacity>

      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-red-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => {
            deleteRecord("shows" , editId);
          } }>
          <Text style={styles.buttonText}>   حذف العرض   </Text>
        </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text style={styles.buttonText}>   اغلاق </Text>
        </TouchableOpacity>
        
      </View>

  </View>

 

</View>
  

</Modal>

    
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
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
 
});

export default ManageTimes;
