import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Platform
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDoc , doc , db   } from '../../../../firebase';
import { AdminContext } from '../../../context/AdminContext';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

const EditEvent = ({navigation , route}) => {

  const { editEvent , error  , success , setError , uploadImage , convertTimeToDateString  , deleteObjectFromFirestore } = useContext(AdminContext);
  const [isLoading , setIsLoading] = useState();
  const [movieData, setMovieData] = useState(null);
  const [eventName , setEventName] = useState('');
  const [eventDesc , setEventDesc] = useState('');
  const [eventLocation , setEventLocation] = useState('');
  const [eventStatus , setEventStatus] = useState('');
  const [eventDate , setEventDate] = useState(new Date());
  const [eventDateNew , setEventDateNew] = useState(new Date());
  const [eventRating , setEventRating] = useState('');
  const [eventImage , setEventImage] = useState('');
  const [eventBanner , setEventBanner] = useState('');
  const [selectedImageThum, setSelectedImageThum] = useState(null);
  const [selectedImageBanner, setSelectedImageBanner] = useState(null);
  const [operationImage , setOperationImage] = useState(false);
  const [operationBanner , setOperationBanner] = useState(false);

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setIsLoading(true);
      const docRef = doc(db, "events", route.params.eventId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovieData(docSnap.data());
          setEventName(docSnap.data().event_name);
          setEventDesc(docSnap.data().event_desc);
          setEventLocation(docSnap.data().event_location);
          setEventStatus(docSnap.data().event_status);
          setEventDate(docSnap.data().event_date);
          const newDate = new Date(docSnap.data().event_date.seconds * 1000) ;
          setEventDateNew(newDate);
          setEventRating(docSnap.data().event_rating);
          setEventImage(docSnap.data().event_image);
          setEventBanner(docSnap.data().event_banner);
          setIsLoading(false);
        } else {
          setMovieData(null);
          setIsLoading(false);
        }
    }
    getInfoFromFireStore();
  } , []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setEventDate(currentDate);
  };

  const handleChooseImageThum = async () => {
    setIsLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("يرجى اعطاء الاذن بالوصول للمعرض");
      setIsLoading(false);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      setError("يرجى اكمال العملية");
      setIsLoading(false);
    } else {
      setSelectedImageThum(pickerResult.uri);
     let imageThum =  uploadImage(pickerResult.uri);
     setEventImage(imageThum);
     setIsLoading(false);
    }
  };

  const handleChooseImageBanner = async () => {
    setIsLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("يرجى اعطاء الاذن بالوصول للمعرض");
      setIsLoading(false);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      setError("يرجى اكمال العملية");
      setIsLoading(false);
    } else {
      setSelectedImageBanner(pickerResult.uri);
      let imageBanner =  uploadImage(pickerResult.uri);
      setEventBanner(imageBanner);
      setIsLoading(false);
    }
  };
  

  const editTheEvent = () => {
    editEvent(route.params.eventId , eventName , eventDesc , eventLocation , eventStatus , eventDate , eventRating , eventImage , eventBanner );

    setTimeout( () => {
      navigation.navigate('AdminDashboard')
    } , 5500)

  }

  const handleChangeImageThum = (url) => {
    // deleteObjectFromFirestore(url);
    setOperationImage(true);

  }

  const handleChangeImageBanner = (url) => {
    // deleteObjectFromFirestore(url);
    setOperationBanner(true);

  }

  if (
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



      { /* INPUTS DASHBOARD */  }
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

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

      <View className="flex flex-col items-end mt-12 mb-5" >

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
اسم المسرحية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="eventName"
   value={eventName}
   onChangeText={(text) => setEventName(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }
{ /*  SINGLE INPUT */ }
<View className="mb-8" >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
وصف المسرحية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={[styles.inputStyle , styles.textAreaInput]}
   multiline={true}
   numberOfLines={8}
   id="eventDesc"
   value={eventDesc}
   onChangeText={(text) => setEventDesc(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
مكان المسرحية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="eventLocation"
   value={eventLocation}
   onChangeText={(text) => setEventLocation(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
حالة المسرحية <Text className="text-red-500 text-base" > * </Text>  
</Text>

      <RNPickerSelect
        style={pickerSelectStyles}
        pickerProps={{
          accessibilityLabel: eventStatus,
        }}
        placeholder={{
          label: eventStatus == "true" ? "متاح" : "غير متاح" ,
          value: eventStatus == "true" ? "متاح" : "غير متاح" ,
        }}
        selectedValue={eventStatus || true} // Set the default value as the first option
        onValueChange={(itemValue) => setEventStatus(itemValue)}
        items={[
          { label: 'منشورة', value: 'true' },
          { label: 'غير منشورة', value: 'false' },
        ]}
      >
      </RNPickerSelect>
  



</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     تاريخ المسرحية <Text className="text-red-500 text-base" > * </Text>  
    </Text>
   


   <View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="eventDate"
   editable={false}
   value={convertTimeToDateString(eventDate)}
 
 />
</View>

<View className="mt-2 " style={styles.datePickerButton} >
   <DateTimePicker
        className=""
          mode="date"
          value={eventDateNew}
          display="default"
          onChange={handleDateChange}
        />
   </View>
       


</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
تقييم المسرحية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="eventRating"
   keyboardType="numeric"
   value={eventRating}
   onChangeText={(text) => setEventRating(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
صورة المسرحية <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View className="" >
   
   {!operationImage ? (
    <View className="relative" >
  <Image source={{ uri: eventImage }} style={{ width: 180, height: 100 }} />
  <TouchableOpacity className="absolute top-2 left-2 bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center" onPress={() => handleChangeImageThum(eventImage) } >
  <AntDesign
                  name="closecircleo"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
  </TouchableOpacity>
  </View>
  ) : (

    <View>
    {selectedImageThum && <Image source={{ uri: selectedImageThum }} style={{ width: 180, height: 100 }} />}

    <TouchableOpacity
        className="block mt-2 text-white py-3  rounded-lg text-sm px-6  mb-2 w-full"
         style={styles.uploadButton}
          onPress={() =>  handleChooseImageThum() }>
          <Text style={styles.buttonText}>   اختيار الصورة </Text>
        </TouchableOpacity>
        </View>
  )} 
 </View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
صورة البنر <Text className="text-red-500 text-base" > * </Text>  
</Text>


<View className="" >
   
   {!operationBanner ? (
    <View className="relative" >
  <Image source={{ uri: eventBanner }} style={{ width: 180, height: 100 }} />
  <TouchableOpacity className="absolute top-2 left-2 bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center" onPress={() => handleChangeImageBanner(eventBanner) } >
  <AntDesign
                  name="closecircleo"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
  </TouchableOpacity>
  </View>
  ) : (

    <View>
    {selectedImageBanner && <Image source={{ uri: selectedImageBanner }} style={{ width: 180, height: 100 }} />}

    <TouchableOpacity
        className="block mt-2 text-white py-3  rounded-lg text-sm px-6  mb-2 w-full"
         style={styles.uploadButton}
          onPress={() =>  handleChooseImageBanner() }>
          <Text style={styles.buttonText}>   اختيار الصورة </Text>
        </TouchableOpacity>
        </View>
  )} 
 </View>

</View>


{ /*  END SINGLE INPUT */ }


  {!isLoading && (
    <TouchableOpacity
        className="mt-2 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => editTheEvent() }>
          <Text style={styles.buttonText}>  تعديل المسرحية </Text>
        </TouchableOpacity>
  )}


      
</View>
  <TouchableOpacity
    className="text-white mb-5 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>

      </KeyboardAvoidingView>
   

      { /* END INPUTS DASHBOARD */  }
     
    
    </ScrollView>
  );
};



const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'right',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    paddingHorizontal: 20,
  },
  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },
  datePickerButton: {
    marginBottom: 20,
    backgroundColor: COLORS.DarkGreen,
    color: COLORS.White,
    borderRadius: BORDERRADIUS.radius_25,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  starIcon: {
    color: COLORS.DarkGreen,
  },
  icon_logo: {
    width: 150,
    height: 50,
  },
  button: {
    marginTop: 55,
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
    textAlign: 'right'

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
});

export default EditEvent;
