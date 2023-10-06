import React, { useState , useContext , useEffect} from 'react';
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
  ActivityIndicator
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { AdminContext } from '../../../context/AdminContext';
import { getDoc , doc , db   } from '../../../../firebase';
import RNPickerSelect from 'react-native-picker-select';

const EditTicket = ({navigation , route}) => {
  
  const [isLoading , setIsLoading] = useState();
  const [ticketSeat , setTicketSeat] = useState('');
  const [ticketPrice , setTicketPrice] = useState('');
  const [ticketCategory , setTicketCategory] = useState('');

  const { editTicket , error  , success , setError , uploadImage } = useContext(AdminContext);

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setIsLoading(true);
      const docRef = doc(db, "tickets", route.params.editId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
         
          setTicketSeat(docSnap.data().ticket_seat);
          setTicketPrice(docSnap.data().ticket_price);
          setTicketCategory(docSnap.data().ticket_category);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
    }
    getInfoFromFireStore();
  } , []);

  const handleEditActor = () => {

    setIsLoading(true);
    editTicket( ticketSeat, ticketPrice , ticketCategory , route.params.editId  , () => {
      navigation.navigate('AdminDashboard')
      setIsLoading(false);
    });
   
  }

  if (
    isLoading
  ) {
    return (
      <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar barStyle={'light-content'} />

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
     رقم المقعد  <Text className="text-red-500 text-base" > * </Text>  
    </Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="ticketSeat"
   value={ticketSeat}
   onChangeText={(text) => setTicketSeat(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }


{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   سعر التذكرة <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="ticketPrice"
   value={ticketPrice}
   keyboardType="numeric"
   onChangeText={(text) => setTicketPrice(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   فئة التذكرة <Text className="text-red-500 text-base" > * </Text>  
</Text>

<RNPickerSelect
        style={pickerSelectStyles}
        pickerProps={{
          accessibilityLabel: ticketCategory,
        }}
        placeholder={{
          label: ticketCategory,
          value: ticketCategory,
        }}
        selectedValue={ticketCategory || 'Bronze'} // Set the default value as the first option
        onValueChange={(itemValue) => setTicketCategory(itemValue)}
        items={[
         
          { label: 'Bronze', value: 'bronze' },
          { label:  'Silver', value: 'silver' },
          { label:  'Gold', value: 'gold' },
          { label:  'Platinum', value: 'platinum' },
          { label:  'Vip', value: 'vip' },
        ]}
      >
      </RNPickerSelect>


</View>
{ /*  END SINGLE INPUT */ }

    {isLoading ?  (
      <View  className="flex items-center justify-center" >
              <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
            </View>
    ) : (
    <TouchableOpacity
        className="text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => handleEditActor() }>
          <Text style={styles.buttonText}> تعديل التذكرة </Text>
        </TouchableOpacity>
    )}
          

</View>
      </KeyboardAvoidingView>
   
      <TouchableOpacity
    className="text-white mb-5 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>

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
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
});

export default EditTicket;
