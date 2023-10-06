import React, {useContext, useState} from 'react';
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
  Platform
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../theme/theme';
import { AuthenticationContext } from '../context/AuthContext';

const SignupScreen = ({navigation}) => {
  
  const [isLoading , setIsLoading] = useState(false);
  const [fullName,setFullName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister, error  } = useContext(AuthenticationContext);
  
  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const maxLength = 10;
    const truncatedText = numericText.slice(0, maxLength);
    setPhoneNumber(truncatedText);
  };

  const handleRegisterUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
     }, 1200);
    onRegister(fullName , phoneNumber , userEmail , password)
  }

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <StatusBar  />

   {  /* TOP HEader */}



      <View className="flex  flex-col items-center justify-center mt-8" style={styles.loginContainer} >

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className=" mt-12" >

      {error && (
          <View className=" p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

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


{ /*  SINGLE INPUT */ }
<View className="" >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
 كلمة المرور <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="password"
  placeholder="*********"
  textContentType="password"
      secureTextEntry
      autoCapitalize="none"
  value={password}
  onChangeText={(text) => setPassword(text) }
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

    <View className="flex items-center w-full" >

    {isLoading ? (
      <View  className="flex items-center justify-center my-5" >
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
    ) : (
      <TouchableOpacity
        className="text-white mt-10 rounded-lg text-sm px-6 py-4 mr-2 mb-2 "
          style={styles.button}
          onPress={() => handleRegisterUser()  }>
          <Text style={styles.buttonText}>  انشاء حساب  </Text>
        </TouchableOpacity>
    )}


    <TouchableOpacity
        className="text-white mt-5 text-sm px-6 py-4 "
          
          onPress={() => navigation.goBack()  }>
          <Text style={styles.buttonText}>  رجوع  </Text>
        </TouchableOpacity>
    </View>

</View>
      </KeyboardAvoidingView>

      </View>
      {  /* TOP HEader */}


     
     
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    paddingHorizontal: 20,
    height: '100%',
    
  },

  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },

  starIcon: {
    color: COLORS.Green,
  },
  icon_logo: {
    width: 200,
    height: 50,
  },
  button: {
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
    paddingVertical: SPACING.space_10,
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
    paddingVertical: SPACING.space_2,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'right',
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
  loginContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',

  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right'
  },

});

export default SignupScreen;
