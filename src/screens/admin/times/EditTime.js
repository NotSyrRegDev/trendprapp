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
  Image,
  Button,
  ActivityIndicator,
  Platform
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { AdminContext } from '../../../context/AdminContext';
import { getDoc , doc , db   } from '../../../../firebase';



const EditTime = ({navigation , route}) => {
  
  
  const [isLoading , setIsLoading] = useState();
  const [timeDate , setTimeDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [timeAvaliablity , setTimeAvaliability] = useState(null);

  useEffect(() => {
    const getInfoFromFirestore = async () => {
      const docRef = doc(db, "shows", route.params.editId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const firestoreTimestamp = docSnap.data().show_date;
  
        // Convert Firestore timestamp to Date object for timeDate
        const timeDateObject = new Date(
          firestoreTimestamp.seconds * 1000 +
          firestoreTimestamp.nanoseconds / 1000000
        );
        setTimeDate(timeDateObject);
  
        // Convert Firestore timestamp to Date object for startTime
        const startTimeObject = new Date(
          docSnap.data().show_start_time.seconds * 1000 +
          docSnap.data().show_start_time.nanoseconds / 1000000
        );
       
        setStartTime(startTimeObject);
  
        // Convert Firestore timestamp to Date object for endTime
        const endTimeObject = new Date(
          docSnap.data().show_end_time.seconds * 1000 +
          docSnap.data().show_end_time.nanoseconds / 1000000
        );
       
        setEndTime(endTimeObject);
  
        // Set other state variables directly
        setTimeAvaliability(docSnap.data().show_status);
      } else {
        setIsLoading(false);
      }
    };
  
    getInfoFromFirestore();
  }, []);

  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setTimeDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setStartTime(currentTime);
   
 
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setEndTime(currentTime);
  };


  const { editShow , error  , success  } = useContext(AdminContext);

  const editTimeShow = (  )=> {
    console.log(endTime);
    editShow(timeDate , startTime , endTime ,   timeAvaliablity , route.params.editId  , route.params.eventId );

     
        setTimeout( () => {
          navigation.navigate('AdminDashboard')
        } , 5500)

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
    <Image source={require('../../../assets/icons/logo_color_white.png')} style={styles.logo} />
    </View>

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
      <View className="flex flex-col items-end mt-16" >

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

   { /*  SINGLE INPUT */ }
<View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     المسرحية <Text className="text-red-500 text-base" > * </Text>  
    </Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="actorName"
   value={route.params.eventName}
   editable={false}

 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     التاريخ <Text className="text-red-500 text-base" > * </Text>  
    </Text>
   
   <View className="mt-2 " style={styles.datePickerButton} >
   <DateTimePicker
        className=""
          value={timeDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
   </View>
       


</View>
{ /*  END SINGLE INPUT */ }


{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-5" htmlFor="username">
  الوقت <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View className="flex flex-row items-center justify-between mt-6"  >

<View className="mx-6 block" >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
  الى <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.timePickerButton} >
<DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={true} // Set to false for 12-hour format
          display="default"
          onChange={handleEndTimeChange}
        />
</View>

</View>

<View className="mx-6 block" >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
  من <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.timePickerButton} >
<DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={true} // Set to false for 12-hour format
          display="default"
          onChange={handleStartTimeChange}
        />
</View>

</View>

   </View>



</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
 الحالة  <Text className="text-red-500 text-base" > * </Text>  
</Text>


<RNPickerSelect
  style={pickerSelectStyles}
  pickerProps={{
    accessibilityLabel: timeAvaliablity,
  }}
  placeholder={{
    label: 'اختر',
    value: timeAvaliablity, // Display the selected value
  }}
  selectedValue={timeAvaliablity || true}
  onValueChange={(itemValue) => setTimeAvaliability(itemValue)}
  items={[
    { label: 'متاح', value: 'true' },
    { label: 'غير متاح', value: 'false' },
  ]}
>
</RNPickerSelect>


</View>
{ /*  END SINGLE INPUT */ }

<TouchableOpacity
        className="mt-2 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() =>  editTimeShow() }>
          <Text style={styles.buttonText}>  تعديل العرض </Text>
        </TouchableOpacity>




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
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  button: {
    marginBottom: 20,
    backgroundColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
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
  timePickerButton: {
    marginBottom: 20,
    backgroundColor: COLORS.DarkGreen,
    color: COLORS.White,
    borderRadius: BORDERRADIUS.radius_25,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    color: 'white',
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
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  }

});

export default EditTime;
