import React, {useEffect, useState , useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Modal,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import {COLORS, SPACING , FONTSIZE , BORDERRADIUS, FONTFAMILY} from '../theme/theme';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import {  query , collection , getDocs , db  , where } from "../../firebase";
import { AuthenticationContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
const {width, height} = Dimensions.get('window');
import Fontisto from 'react-native-vector-icons/Fontisto';
import { DrawerActions } from '@react-navigation/native';

const ExploreScreen = ({navigation}) => {

  const {  isFilterModalVisible , setIsFilterModalVisible  , categoryArray  } = useContext(AppContext);


  const { isAuthenticated  } = useContext(AuthenticationContext);
  const [isLoading , setIsLoading] = useState();
  const [error , setError] = useState();
    
  const [allEventsList, setAllEventsList] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState('الكل');



  const getEventsData = async () => {
    try {
      setIsLoading(true);
      let q;
      if (categoryFilter === "الكل") {
        q = collection(db, "events");
      } else {
        q = query(collection(db, "events"), where("event_category", "==", categoryFilter));
      }

      const querySnapshot = await getDocs(q);
      const eventData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAllEventsList(eventData);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    setIsLoading(true);
  
    getEventsData();
  }, [categoryFilter]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
      getEventsData();
      setIsLoading(true);
    }, 2000);
  };


  if (
    isLoading
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      </ScrollView>
    );
  }

  return (
    
    <ScrollView
 style={{backgroundColor:COLORS.Black }}
      refreshControl={
        <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="white" 
    />
        }
    >
   <ScrollView style={styles.container} bounces={false}>
   <StatusBar barStyle={'light-content'} />

      {error && (
          <View className=" p-4 text-sm text-white rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}
    
        <View className="mx-2" >
     
  <View className="mt-2" >
  

  {allEventsList?.length !== 0 ? (
    <View>
    <CategoryHeader title={'المسرحيات'} postion={'right'} />
  <FlatList
    data={allEventsList?.reverse()}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    bounces={false}
    contentContainerStyle={styles.containerGap16}
    numColumns={2}
    renderItem={({ item, index }) => (
      <SubMovieCard
        shoudlMarginatedAtEnd={true}
        cardFunction={() => {
          navigation.dispatch(
                  DrawerActions.jumpTo('EventDetailScreen', {movieid: item.id})
                );
        } }
        cardWidth={width / 2.2}
        isFirst={index === 0}
        title={item.event_name}
        imagePath={item.event_image}
        style={{ margin: 5 }}
      />
    )}
  />
  </View>
) : (
  <View className="flex items-center justify-center h-full" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-lg"  >
     لم نستطع العثور على نتائج
      </Text>
      
    </View>
)}
      

  </View>

  <Modal transparent={true} visible={isFilterModalVisible} animationType="slide">
  <TouchableWithoutFeedback >
 
<View style={styles.modalContainer} >
  <View style={styles.modalContent} >
  <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View className="flex flex-col items-center justify-center mb-8" >

    <TouchableOpacity onPress={() => setCategoryFilter('الكل') } className="flex flex-row w-full items-center justify-between mt-5" >
    {categoryFilter == "الكل" ? (
      <Fontisto
                  name="checkbox-active"
                  color={COLORS.DarkGreen}
                  size={FONTSIZE.size_18}
                />
    ) : (
      <Fontisto
                  name="checkbox-passive"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
    ) }

    <Text className="text-white text-base" style={styles.font} > الكل </Text>
    </TouchableOpacity>

    {categoryArray && categoryArray.map((item) => (
      <TouchableOpacity onPress={() => {
        setCategoryFilter(item.category)
      }} 
      className="flex flex-row w-full items-center justify-between mt-5" >
      {categoryFilter == item.category  ? (
        <Fontisto
                  name="checkbox-active"
                  color={COLORS.DarkGreen}
                  size={FONTSIZE.size_18}
                />
      ) : (
        <Fontisto
                  name="checkbox-passive"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
      )}

    <Text className="text-white text-base" style={styles.font} > {item.category} </Text>
    </TouchableOpacity>
    ))  }

     
    </View>


  </ScrollView>

  </View>

  <View className="flex felx-row items-center" >

    <TouchableOpacity
    className="mt-2 text-center text-white py-1 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-1  mb-2 w-full"
    style={styles.buttonBorder}
    onPress={() => setIsFilterModalVisible(!isFilterModalVisible) }>
    <Text style={styles.buttonText}>   اغلاق </Text>
    </TouchableOpacity>

    </View>

</View>


  </TouchableWithoutFeedback>

</Modal>



</View>
    </ScrollView>

    </ScrollView>
 
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    paddingHorizontal: 10,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 50,
    maxWidth: 170,
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
    marginHorizontal: SPACING.space_36,
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
  containerGap16: {
    gap: SPACING.space_12,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 30,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.DarkGreen,
    borderRadius: BORDERRADIUS.radius_25,
    padding: 4
  },

  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.BlackRGB10,
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 1,
    borderWidth: 2,
    borderColor: COLORS.Grey,
  },
  searchIcon: {
    marginRight: 20,
  },
  searchInput: {
    flex: 1,
    color: COLORS.White,
    fontFamily: FONTFAMILY.cairo,
  },
  modalContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#0d0d0d',
    borderRadius: 10,
    maxHeight: '45%',
    width: '100%',
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  font: {
    fontFamily: FONTFAMILY.cairo
  }

});

export default ExploreScreen;
