import  React , {useContext , useState , useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../../theme/theme';
import SettingComponent from '../../components/SettingComponent';
import { AuthenticationContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserAccountAuth = ({navigation}) => {

  const { onLogout } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('trendpr_user');
        setUser(JSON.parse(value));
      } catch (error) {
       
      }
    };

    getData();
  }, []);

  

  return (
    <View style={styles.container}>
      <StatusBar hidden />
    
      <View className="flex items-center justify-center mt-2 sticky" >
      <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.logo} />
      </View>

      <View className="mt-2" >
        <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText} className="mt-1" > {user?.full_name}  </Text>
        <Text style={styles.avatarText}> {user?.phone_number}  </Text>
      </View>
      </View>


      <View style={styles.profileContainer} className="mt-12" >
      
        <SettingComponent
          icon="account"
          heading="تعديل الحساب"
          navigation={navigation}
          toNav={"EditAccountScreen"}
        />

<SettingComponent
          icon="comment-question-outline"
          heading="الاسئلة الشائعة"
          navigation={navigation}
          toNav={"FaqScreen"}
        />
         <SettingComponent
          icon="information-outline"
          heading="من نحن"
          navigation={navigation}
          toNav={"WhoWeAreScreen"}
        />
        
        <SettingComponent
          icon="phone-hangup-outline"
          heading="تواصل معنا"
          navigation={navigation}
          toNav={"ContactUsScreen"}
        />
        
       
      </View>

      <TouchableOpacity
        className="mt-5 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => onLogout() }>
          <Text style={styles.buttonText}> تسجيل الخروج </Text>
        </TouchableOpacity>

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

export default UserAccountAuth;
