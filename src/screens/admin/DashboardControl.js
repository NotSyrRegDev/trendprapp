import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS} from '../../theme/theme';
import { AuthenticationContext } from '../../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardControl = ({navigation}) => {

  const [error , setError] = useState();
  const { onLogout } = useContext(AuthenticationContext);

 


  return (
    <ScrollView style={styles.container} bounces={false}>
  <StatusBar barStyle={'light-content'} />
  
  {/* TOP Header */}
  <View className="flex flex-row items-center justify-between mt-16">
    <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />
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
  {/* TOP Header */}

  {/* Rest of the code */}
  {error && (
          <View className="p-4 text-sm text-white rounded-lg bg-red-500 text-right mb-5 flex items-end">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
  
        
          <View className="flex items-center justify-center h-full " >
    
        <TouchableOpacity
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2 py-4 mr-2 mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('AddEventDashboard')}
        >
        <Text style={styles.buttonText}> اضافة مسرحية </Text>
        </TouchableOpacity>

        <TouchableOpacity
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2 py-4 mr-2 mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('CategoriesAdmin')}
        >
        <Text style={styles.buttonText}>  التصنيفات  </Text>
        </TouchableOpacity>

        <TouchableOpacity
        className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2 py-4 mr-2 mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('AddAdmin')}
        >
        <Text style={styles.buttonText}> اضافة حساب ادمن </Text>
        </TouchableOpacity>

        </View>

     

        <View className="mt-12 flex items-center justify-center" style={styles.logoutContainer} >
        <TouchableOpacity
        className="text-white py-3 mb-6 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6   w-full"
          style={styles.buttonBorder}
          onPress={() => onLogout() }>
          <Text style={styles.buttonText}> تسجيل الخروج </Text>
        </TouchableOpacity>
        </View>
    

</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    paddingHorizontal: 20,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },
  containerGap36: {
    gap: SPACING.space_36,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
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
    padding: 4
  },

});

export default DashboardControl;
