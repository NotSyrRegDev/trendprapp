import { View, Text , StyleSheet , StatusBar , TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const TicketLoginScreen = ( {  navigation} ) => {
  return (
    <View style={styles.container}>
    <StatusBar hidden />
  
    <View className="flex items-center justify-center mt-2 sticky" >
    <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo} />
    </View>

    <View className="mt-2 flex items-center justify-center h-96" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-lg"  >
     لرؤية التذاكر الخاصة بك يجب تسجيل الدخول
      </Text>

      <TouchableOpacity
      className="mt-5 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>  تسجيل الدخول ْ</Text>
      </TouchableOpacity>
    </View>


    <View style={styles.profileContainer} className="mt-12" >
    
      
     
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    direction: 'rtl',
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
  
});

export default TicketLoginScreen