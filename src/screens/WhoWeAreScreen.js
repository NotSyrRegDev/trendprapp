import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity } from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../theme/theme';
import AppHeader from '../components/AppHeader';


const WhoWeAreScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
    
      <View className="flex items-center justify-center mt-3 relative" >
      <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo} />

      <View className="absolute top-16 left-0" >
      <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
      </View>
      </View>
      <View className="mt-2" >
      <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
        من نحن ؟
        </Text>

      </View>

      <View className="flex items-center w-full" >

<TouchableOpacity
    className="text-white mt-16 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>
</View>



      
    </View>
  );
};

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

export default WhoWeAreScreen;
