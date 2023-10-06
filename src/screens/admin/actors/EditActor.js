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


const EditActor = ({navigation , route}) => {
  
  const [operationImage , setOperationImage] = useState(false);
  const [dataObject , setDataObject] = useState(null);
  const [isLoading , setIsLoading] = useState();
  const [actorName , setActorName] = useState('');
  const [actorJob , setActorJob] = useState('');
  const [actorThum , setActorThum] = useState('');

  const { editActor , error  , success , setError , uploadImage } = useContext(AdminContext);

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      setIsLoading(true);
      const docRef = doc(db, "actors", route.params.editId );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataObject(docSnap.data())
          setActorName(docSnap.data().actor_name);
          setActorJob(docSnap.data().actor_job);
          setActorThum(docSnap.data().actor_thum);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
    }
    getInfoFromFireStore();
  } , []);

  const handleChangeImageThum = (url) => {
    // deleteObjectFromFirestore(url);
    setOperationImage(true);

  }

  const [selectedImageActor , setSelectedImageActor ] = useState(null);
  
  const handleChooseImageActor = async () => {
    setIsLoading(true);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setError("يرجى اعطاء الاذن بالوصول للمعرض");
      setIsLoading(false);
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      setError("يرجى اكمال العملية");
    } else {
      setSelectedImageActor(pickerResult.uri);
      let imageActor =  uploadImage(pickerResult.uri);
      setIsLoading(false);
      setActorThum(imageActor);
    }
  }

  const handleEditActor = () => {
    setIsLoading(true);
    editActor( actorName, actorJob , actorThum , route.params.editId , () => {
      navigation.navigate('AdminDashboard');
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
     اسم الممثل <Text className="text-red-500 text-base" > * </Text>  
    </Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="actorName"
   value={actorName}
   onChangeText={(text) => setActorName(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }


{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
  دور الممثل <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="actorJob"
   value={actorJob}
   onChangeText={(text) => setActorJob(text)}
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-2 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
 صورة الممثل  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View className="" >
   
   {!operationImage ? (
    <View className="relative" >
  <Image source={{ uri: actorThum }} style={{ width: 180, height: 100 }} />
  <TouchableOpacity className="absolute top-2 left-2 bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center" onPress={() => handleChangeImageThum(actorThum) } >
  <AntDesign
                  name="closecircleo"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
  </TouchableOpacity>
  </View>
  ) : (

    <View>
    {selectedImageActor && <Image source={{ uri: selectedImageActor }} style={{ width: 180, height: 100 }} />}

    <TouchableOpacity
        className="block mt-2 text-white py-3  rounded-lg text-sm px-6  mb-2 w-full"
         style={styles.uploadButton}
          onPress={() =>  handleChooseImageActor() }>
          <Text style={styles.buttonText}>   اختيار الصورة </Text>
        </TouchableOpacity>
        </View>
  )} 
 </View>


</View>
{ /*  END SINGLE INPUT */ }

{!isLoading && (
  
<TouchableOpacity
        className="text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => handleEditActor() }>
          <Text style={styles.buttonText}> تعديل الممثل </Text>
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

export default EditActor;
