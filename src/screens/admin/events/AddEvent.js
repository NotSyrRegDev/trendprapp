import React, { useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  Button
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AdminContext } from '../../../context/AdminContext';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';




const  AddEvent = ({navigation}) => {

  const [isLoading , setIsLoading] = useState(false);
  const [eventName , setEventName] = useState('');
  const [eventDesc , setEventDesc] = useState('');
  const [eventLocation , setEventLocation] = useState('');
  const [eventStatus , setEventStatus] = useState('');
  const [eventDate , setEventDate] = useState(new Date());
  const [eventRating , setEventRating] = useState('');
  const [eventImage , setEventImage] = useState('');
  const [eventBanner , setEventBanner] = useState('');
  const [selectedImageThum, setSelectedImageThum] = useState(null);
  const [selectedImageBanner, setSelectedImageBanner] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setEventDate(currentDate);
  };

  const { addEvent , error  , success , setError , uploadImage } = useContext(AdminContext);

 
  const handleChooseImageThum = async () => {
    setIsLoading(true)
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

  const addNewEvent = () => {
    addEvent(eventName , eventDesc , eventLocation , eventStatus , eventDate , eventRating , eventImage , eventBanner );

    setTimeout( () => {
      navigation.navigate('AdminDashboard')
    } , 5500)

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
          label: 'اختر',
          value: '',
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
   
   <View className="mt-2 " style={styles.datePickerButton} >
   <DateTimePicker
        className=""
          value={eventDate}
          mode="date"
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
 {selectedImageThum && <Image source={{ uri: selectedImageThum }} style={{ width: 180, height: 100 }} />}
 
<TouchableOpacity
        className="block mt-2 text-white py-3  rounded-lg text-sm px-6  mb-2 w-full"
         style={styles.uploadButton}
          onPress={() =>  handleChooseImageThum() }>
          <Text style={styles.buttonText}>   اختيار الصورة </Text>
        </TouchableOpacity>
      
 </View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
صورة البنر <Text className="text-red-500 text-base" > * </Text>  
</Text>


 <View className="" >
 {selectedImageBanner && <Image source={{ uri: selectedImageBanner }} style={{ width: 180, height: 100 }} />}
 
<TouchableOpacity
        className="block mt-2 text-white py-3 rounded-lg  text-sm px-6  mb-2 w-full"
        style={styles.uploadButton}
          onPress={() =>  handleChooseImageBanner() }>
          <Text style={styles.buttonText}>   اختيار الصورة </Text>
        </TouchableOpacity>
      
 </View>

</View>


{ /*  END SINGLE INPUT */ }

  {!isLoading && (
    <TouchableOpacity
        className="mt-2 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() =>  addNewEvent() }>
          <Text style={styles.buttonText}>  اضافة المسرحية </Text>
        </TouchableOpacity>
  )}


</View>
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
    textAlign: 'right',
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
  uploadButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },

});

export default AddEvent;
