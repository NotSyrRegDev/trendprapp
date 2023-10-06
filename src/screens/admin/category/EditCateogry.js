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
import AntDesign from 'react-native-vector-icons/AntDesign';


const EditCategory = ({navigation , route}) => {
  
  const [operationImage , setOperationImage] = useState(false);
  const [dataObject , setDataObject] = useState(null);
  const [isLoading , setIsLoading] = useState();
  const [categoryName , setCategoryName] = useState('');
  const [actorJob , setActorJob] = useState('');
  const [actorThum , setActorThum] = useState('');

  const { editCategory , error  , success , setError  } = useContext(AdminContext);

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setIsLoading(true);
      const docRef = doc(db, "categories", route.params.editId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataObject(docSnap.data())
          setCategoryName(docSnap.data().category);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
    }
    getInfoFromFireStore();
  } , []);



 

  const handleEditActor = () => {
    setIsLoading(true);
    editCategory( categoryName , route.params.editId , () => {
      navigation.navigate('AdminDashboard')
      setIsLoading(false);
    } );

  }

  if (
    dataObject == null
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


{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      الفئة <Text className="text-red-500 text-base" > * </Text>  
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



{isLoading ?  (
  <View  className="flex items-center justify-center" >
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
) : (
  <TouchableOpacity
        className="text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => handleEditActor() }>
          <Text style={styles.buttonText}> تعديل الفئة </Text>
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
  logo: {
    resizeMode: 'cover',
    maxHeight: 100,
    maxWidth: 320,
  },
});

export default EditCategory;
