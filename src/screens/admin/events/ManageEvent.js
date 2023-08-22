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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDoc , doc , db   } from '../../../../firebase';
import { AdminContext } from '../../../context/AdminContext';


const ManageEvent = ({navigation , route}) => {
  
  const [movieData, setMovieData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading , setIsLoading] = useState(true);
  
  useEffect(() => {
    const getInfoFromFireStore = async () => {
      const docRef = doc(db, "events", route.params.movieid );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const movieDataWithId = { id: docSnap.id, ...docSnap.data() };
          setMovieData(movieDataWithId);
        } else {
          setMovieData(null)
        }
    }
    getInfoFromFireStore();
  } , []);
  
  const { convertTimeToDateString ,  deleteRecord , error , setError , success } = useContext(AdminContext);

  if (
    movieData == undefined &&
    movieData == null 
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
    {movieData?.event_name}  
        </Text>

        

        <View className="flex flex-row items-center justify-between flex-wrap mt-8" >

        <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage} 
        onPress={() => navigation.navigate('ManageActors' , {
          eventId: movieData?.id,
          eventName: movieData?.event_name
        }) }
        >
        
         
            <Image source={require('../../../assets/icons/admin_icons/actor.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-white text-center mt-5 text-base" > الممثلين </Text>

            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
            onPress={() => navigation.navigate('ManageTickets' , {
              eventId: movieData?.id,
          eventName: movieData?.event_name
            } ) }
             >
            <Image source={require('../../../assets/icons/admin_icons/plane-tickets.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-white text-center mt-5 text-base" > التذاكر </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
            onPress={()=> navigation.navigate('EventDetailAdmin' , {movieid: movieData?.id}) }
             >
            <Image source={require('../../../assets/icons/admin_icons/party.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-white text-center mt-5 text-base" > الفعالية </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
             onPress={()=> navigation.navigate('ManageTimes' , {
              eventId: movieData?.id,
          eventName: movieData?.event_name
             } ) }
             >
            <Image source={require('../../../assets/icons/admin_icons/on-time.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-white text-center mt-5 text-base" > العروض </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
              onPress={() => navigation.navigate('EditEventDashboard' , {
                eventId: movieData?.id,
          eventName: movieData?.event_name
              } ) }
             >
            <Image source={require('../../../assets/icons/admin_icons/edit.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-white text-center mt-5 text-base" > تعديل </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/4 flex-col items-center" style={styles.boxManage}
            onPress={() => navigation.navigate('ManageBookings' , {
              eventId: movieData?.id,
              eventName: movieData?.event_name
            } ) }
             >
            <Image source={require('../../../assets/icons/admin_icons/appointment.png')} style={styles.iconBox} />
            <Text style={styles.font} className="text-white text-center mt-5 text-base" > الحجوزات </Text>
            </TouchableOpacity>

        </View>

    </View>

    <View className="mt-8" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
         معلومات
        </Text>

        <View className="flex flex-row justify-around items-center flex-wrap" >

        <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
            <Text style={styles.errorText} className="mx-1"  >   {movieData?.event_location}  </Text>

            <Octicons
          name="location"
          size={26}
          style={[styles.starIcon]}
        />
          </View>

          <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
          <Text style={styles.errorText} className="mx-1"  >   {movieData?.event_rating}  </Text>
          <AntDesign
          name="staro"
          size={26}
          style={[styles.starIcon]}
        />
           
          </View>

          <View className="p-3 text-sm text-white rounded-lg  text-right mb-5 flex flex-row items-center" >
          <Text style={styles.errorText} className="mx-2"  >   {convertTimeToDateString(movieData?.event_date)}  </Text>
          <Fontisto
          name="date"
          size={26}
          style={[styles.starIcon]}
        />
           
          </View>

        </View>

      


    </View>

    <View className="mt-8" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
         الحالة
        </Text>

        <View className=" p-4 text-sm text-white rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  > {movieData?.event_status == "true" ? "منشورة" : "منشورة"} </Text>
          </View>

    </View>
    { /* END EVENT MANAGE */ }

    <View className="mt-8 mb-8" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
         حذف الفعالية
        </Text>

        <TouchableOpacity
        className="mt-2 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text style={styles.buttonText}>  حذف  </Text>
        </TouchableOpacity>

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
          <Text className="text-white text-center text-lg mb-5" style={styles.font} > هل انت متاكد من رغبتك في حذف الفعالية ؟   </Text>
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-red-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => {
            deleteRecord("events" , route.params.movieid);
          } }
          >
          <Text style={styles.buttonText}>   تاكيد الحذف  </Text>
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
    paddingBottom: 20,
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
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
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
 
});

export default ManageEvent;
