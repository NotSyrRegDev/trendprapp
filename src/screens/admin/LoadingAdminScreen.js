import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FONTFAMILY } from '../../theme/theme';

const LoadingAdminScreen = ( {navigation}) => {

  return (
    <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
      <View style={styles.textContainer}>
        <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.logo} />
        <Text style={styles.title}>شركة ترند</Text>
        <Text style={styles.subtitle}>للإنتاج الفني والمسرحي والدعاية والإعلان 2023 ©</Text>

        <TouchableOpacity
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-4 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          style={styles.button}
          onPress={() => navigation.navigate('AdminDashboard')}>
          <Text style={styles.buttonText}>  إدارة الفعاليات </Text>
        </TouchableOpacity>
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#12a591',
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 110,
    maxWidth: 350,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.tajawal_bold,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTFAMILY.tajawal_light,
    fontSize: 18,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  button: {
    marginTop: 55,
    borderRadius: 5,
 
    marginBottom: 20,
    width: 220,
    backgroundColor: '#020404',
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    
    color: 'white',
    textAlign: 'center',
  },
});

export default LoadingAdminScreen;