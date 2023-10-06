import React, {useContext, useEffect, useState , useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS} from '../../theme/theme';
import {  query , collection , getDocs , db } from "../../../firebase";
import InputHeader from '../../components/InputHeader';
import SubMovieCard from '../../components/SubMovieCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthenticationContext } from '../../context/AuthContext';
const {width, height} = Dimensions.get('window');
import { useFocusEffect } from '@react-navigation/native';


const Dashboard = ({navigation}) => {

  const [error , setError] = useState();
  const [isLoading , setIsLoading] = useState();
  const [allEventsList, setAllEventsList] = useState(null);
  const { onLogout } = useContext(AuthenticationContext);

  const getEventsData = async () => {
    try {
      const q = query(collection(db, "events"));
      const querySnapshot = await getDocs(q);
      const eventData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAllEventsList(eventData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getEventsData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);
      getEventsData();
    }, 2000);
  };

  if (
    allEventsList == undefined &&
    allEventsList == null 
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar barStyle={'light-content'} />

        {  /* TOP HEader */}
      <View className="flex flex-row items-center justify-between mt-16" >

      <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />

    

      </View>
      {  /* TOP HEader */}

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
  
  {/* TOP Header */}
  <View className="flex flex-row items-center justify-center mt-16">
    <Image source={require('../../assets/icons/logo_color_white.png')} style={styles.icon_logo} />
   
  </View>
  {/* TOP Header */}

  {/* Rest of the code */}
  {error && (
          <View className="p-4 text-sm text-white rounded-lg bg-red-500 text-right mb-5 flex items-end">
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
  
        <View className="flex flex-row items-center justify-between w-full">
          <View style={styles.InputHeaderContainer} className="w-2/3 mx-1">
            <InputHeader />
          </View>
  
          <View className="w-1/3 mx-1">
            <TouchableOpacity
              className="text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-2 py-4 mr-2 mb-2"
              style={styles.button}
              onPress={() => navigation.navigate('DashboardControl')}
            >
              <Text style={styles.buttonText}> إنشاء </Text>
            </TouchableOpacity>
          </View>
        </View>
  {/* ... */}
  
  <FlatList
  nestedScrollEnabled={true} 
    data={allEventsList}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    bounces={false}
    contentContainerStyle={styles.containerGap36}
    numColumns={2}
    renderItem={({ item, index }) => (
      <SubMovieCard
        shoudlMarginatedAtEnd={true}
        cardFunction={() => {
        navigation.navigate('ManageEvent', { movieid: item.id });
        }}
        cardWidth={width / 2.3}
        isFirst={index == 0 ? true : false}
        // isLast={index == upcomingMoviesList?.length - 1 ? true : false}
        title={item.event_name}
        imagePath={item.event_image}
        style={{ margin: 40 }}
      />
    )}
  />

        <View className="flex items-center justify-center" style={styles.logoutContainer} >
        <TouchableOpacity
        className="text-white py-3 mb-6 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6   w-full"
          style={styles.button}
          onPress={() => onLogout() }>
          <Text style={styles.buttonText}> تسجيل الخروج </Text>
        </TouchableOpacity>
        </View>
    

</ScrollView>

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
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'right',
    color: COLORS.White
  },
  logoutContainer:{
    transform: [{ translateY: -40 }], 
  }

});

export default Dashboard;
