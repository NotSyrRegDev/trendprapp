import React , {useContext, useState , useEffect , useCallback} from 'react';
import {Text, View, StyleSheet, StatusBar, Image , KeyboardAvoidingView , TextInput , TouchableOpacity  , Platform , ActivityIndicator} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../theme/theme';
import { AuthenticationContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const EditAccountScreen = ({navigation}) => {

  const [isLoading , setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [fullName,setFullName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [userEmail, setEmail] = useState('');

  
  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const maxLength = 10;
    const truncatedText = numericText.slice(0, maxLength);
    setPhoneNumber(truncatedText);
  };

  const {  editUserProfile , error , success , setError  } = useContext(AuthenticationContext);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('trendpr_user');
          let jsonPrsed = JSON.parse(value);
          setUserId(jsonPrsed.id);
          setFullName(jsonPrsed.full_name);
          setPhoneNumber(jsonPrsed.phone_number);
          setEmail(jsonPrsed.email);
        
        } catch (error) {
        }
      };
  
      getData();
    }, [])
  );

  const editProfile = () => {
  
    setIsLoading(true);
    editUserProfile(userId , fullName  , userEmail , phoneNumber  , () => {
      navigation.navigate('Tab');
      setIsLoading(false);
    });

  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
    
      <View className="flex flex-col h-full mt-10" >

      {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-emd" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex flex-col items-end mt-12" >

      { /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   الاسم الكامل  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
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
   id="email"
   placeholder="أدخل البريد الاكلتروني"
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

      <View className="flex items-center w-full" >

      {isLoading ? (
        <View  className="flex items-center justify-center" >
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      ) : (
        <TouchableOpacity
        className="text-white mt-10 rounded-lg text-sm px-6 py-4 mr-2 mb-2 "
          style={styles.button}
          onPress={() => editProfile()  }>
          <Text style={styles.buttonText}>  تعديل حساب  </Text>
        </TouchableOpacity>
      )}


    <TouchableOpacity
        className="text-white mt-5 text-sm px-6 py-4 "
          
          onPress={() => navigation.goBack()  }>
          <Text style={styles.buttonText}>  رجوع  </Text>
        </TouchableOpacity>
    </View>

      </View>
      
    

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,

    paddingHorizontal: 25,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
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
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  font: {
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.tajawal,
    textAlign: 'left'
  },
  button: {
    width: '85%',
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
  textInput: {
    fontWeight: 'bold',
    textAlign: 'right',
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
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
  
  },
  
});

export default EditAccountScreen;
