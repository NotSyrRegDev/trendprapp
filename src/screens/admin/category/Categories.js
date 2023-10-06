import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  Modal

} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {  query , collection , getDocs , db , where   } from "../../../../firebase";
import { AdminContext } from '../../../context/AdminContext';


const Categories = ({navigation , route}) => {

  const [isLoading , setIsLoading] = useState();
  const [ categoriesArray , setCategoriesArray ] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const {  deleteRecord , error , setError , success } = useContext(AdminContext);
  
  useEffect(() => {
    setIsLoading(true);
  
    const getTimesData = async () => {
      try {
        const q = query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCategoriesArray(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getTimesData();
  }, []);

  const handleModal = (  id ) => {
   setModalVisible(!modalVisible);
   setEditId(id);
   }


  if (
    isLoading
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar barStyle={'light-content'} />

      {  /* TOP HEader */}

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

    { /* EVENT MANAGE */ }
    <View className="mt-12" >

    <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
    الفئات الحالية
        </Text>

        <View className="flex flex-col mt-5" >

      {categoriesArray && categoriesArray.length !== 0 ? categoriesArray.map((item , index) => (

        <TouchableOpacity onPress={() => handleModal(item.id) } key={index} className="w-full p-4 flex-row items-center justify-between text-sm rounded-lg  bg-gray-800 border border-blue-100 mb-5" >
        <View>
        <Feather
                  name="check-square"
                  color={COLORS.DarkGreen}
                  size={FONTSIZE.size_24}
                />
        </View>
        <View>
        <Text className="text-white text-lg" style={styles.font} > 
          {item.category}
          </Text>
        </View>
       
        

        </TouchableOpacity>

      )) : (
        <Text style={styles.font} className="bg-red-500 mt-5 p-2 w-96 rounded-full block text-white font-bold mb-10 text-lg"  >
        لا يوجد فئات بعد  
        </Text>
      ) }
        { /* SINGLE ITEM */ }

       
        <TouchableOpacity
        className="mt-3 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.navigate('AddCategoryDashboard')}>
          <Text style={styles.buttonText}> إضافة فئة </Text>
        </TouchableOpacity>

        <TouchableOpacity
    className="text-white mt-2 text-sm px-6 py-4 pb-12"
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  رجوع  </Text>
    </TouchableOpacity>
      

        </View>



    </View>




    { /* END EVENT MANAGE */ }

    <Modal transparent={true} visible={modalVisible} animationType="slide">

<View style={styles.modalContainer} >
  <View style={styles.modalContent} >

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
      
          <View className="flex felx-row items-center justify-center" >
          <Text className="text-white text-center text-lg mb-5" style={styles.font} > الاجرائات على الفئة  </Text>
          
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-green-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() =>  {
            setModalVisible(!modalVisible);
            navigation.navigate('EditCategory' , {
    editId : editId,
   } );


          } }>
          <Text style={styles.buttonText}>   تعديل الفئة   </Text>
        </TouchableOpacity>

      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-red-500  rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBG}
          onPress={() => {
            deleteRecord("categories" , editId);
          } }>
          <Text style={styles.buttonText}>   حذف الفئة   </Text>
        </TouchableOpacity>
        
      <TouchableOpacity
        className="mt-2 text-center text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => setModalVisible(!modalVisible) }>
          <Text style={styles.buttonText}>   اغلاق </Text>
        </TouchableOpacity>
        
      </View>

  </View>

 

</View>
  

</Modal>

    
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
  font: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: FONTFAMILY.tajawal,
  },
  iconBox: {
    width:50 ,
    height:50,
  },
  boxManage: {
    borderRadius: 20,
    marginTop: 55,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    borderRadius: 10,
    maxHeight: '40%',
    width: '100%',
    padding: 20,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
  buttonBG: {
    minWidth: '85%',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Categories;
