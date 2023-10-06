import React, { useState , useContext , useRef} from 'react';
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
  ActivityIndicator,
  Platform
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AdminContext } from '../../../context/AdminContext';



const AddCategory = ({navigation , route}) => {
  
  const [isLoading , setIsLoading] = useState(false);
  const [categoryName , setCategoryName] = useState('');

  const { addCategory , error  , success , setError  } = useContext(AdminContext);


  const scrollViewRef = useRef();

  const handleAddCateogry = () => {
    setIsLoading(true);
    addCategory( categoryName , () => {
      navigation.navigate('AdminDashboard')
      setIsLoading(false);
    });
    
  }

  return (
    <ScrollView style={styles.container} bounces={false}
          
  ref={scrollViewRef}
  contentContainerStyle={{ flexGrow: 1 }} 
    >
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
        <>
        {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
        <View className=" p-4 text-sm text-white rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        </>
         
        )}

        {success && (
          <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className=" p-4 text-sm text-white rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
          </>
    
        )}


{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   اسم التصنيف <Text className="text-red-500 text-base" > * </Text>  
    </Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="actorName"
   value={categoryName}
   onChangeText={(text) => setCategoryName(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }



{ /*  END SINGLE INPUT */ }

{isLoading ? (
 
      <View className="mb-5 mt-5" >
      <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
       </View>
) : (
  <TouchableOpacity
        className="text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => handleAddCateogry() }>
          <Text style={styles.buttonText}> إضافة التصنيف </Text>
        </TouchableOpacity>
)}


</View>
      </KeyboardAvoidingView>
   

      { /* END INPUTS DASHBOARD */  }
     
    
    </ScrollView>
  );
};

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
});

export default AddCategory;
