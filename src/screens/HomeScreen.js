import React, {useEffect, useState , useContext , useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  RefreshControl,
} from 'react-native';
import {COLORS, SPACING , FONTSIZE , BORDERRADIUS, FONTFAMILY} from '../theme/theme';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import {  query , collection , getDocs , db } from "../../firebase";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import RefreshableScreen from '../common/RefreshableScreen';
import { DrawerActions } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import { useFocusEffect } from '@react-navigation/native';



const HomeScreen = ({navigation}) => {

  const [isLoading , setIsLoading] = useState();
  const [error , setError] = useState();

  const [newEventsList, setNewEventsList] =
    useState(null);
    
  const [allEventsList, setAllEventsList] = useState(null);
  const getEventsData = async () => {
    try {
      setIsLoading(true);
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
    newEventsList == undefined &&
    newEventsList == null &&
    allEventsList == undefined &&
    allEventsList == null 
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
    
        <View className="mt-2" >

  

      <CategoryHeader title={'أحدث المسرحيات'} postion={'center'}  />
      <View style={styles.dirR} >
      <FlatList
        data={allEventsList.reverse()}
        keyExtractor={(item) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.event_name) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.dispatch(
                  DrawerActions.jumpTo('EventDetailScreen', {movieid: item.id})
                );
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              // isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.event_name}
              imagePath={item.event_image}
              vote_average={item.event_rating}

            />
          );
        }}
      />

      </View>
      

    <CategoryHeader title={'ترفيهية'} postion={'right'} />

     <View style={styles.dirR} >
      <FlatList
    horizontal
    data={[...allEventsList].reverse().filter(item => item.event_category == "ترفيهية")}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    bounces={false}
    contentContainerStyle={styles.containerGap16}
    
  renderItem={({item, index}) => (
    <SubMovieCard
      shoudlMarginatedAtEnd={true}
      cardFunction={() => {
        navigation.dispatch(
                  DrawerActions.jumpTo('EventDetailScreen', {movieid: item.id})
                );
      }}
      cardWidth={width / 2}
    
      isFirst={index == 0 ? true : false}
      title={item.event_name}
      imagePath={item.event_image}
      style={{margin: 5}} 
    />
  )}
/>

     </View>
     

      <CategoryHeader title={'موسيقى'} postion={'right'} />
      <View style={styles.dirR} >
          <FlatList
        horizontal
        data={[...allEventsList].reverse().filter(item => item.event_category == "موسيقى")}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap16}
        
      renderItem={({item, index}) => (
        <SubMovieCard
          shoudlMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.dispatch(
                  DrawerActions.jumpTo('EventDetailScreen', {movieid: item.id})
                );
          }}
          cardWidth={width / 2}
        
          isFirst={index == 0 ? true : false}
          title={item.event_name}
          imagePath={item.event_image}
          style={{margin: 5}} 
        />
      )}
    />

     </View>

      <CategoryHeader title={'معارض'} postion={'right'} />
      <View style={styles.dirR} >
          <FlatList
        horizontal
        data={[...allEventsList].reverse().filter(item => item.event_category == "معارض")}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap16}
        
      renderItem={({item, index}) => (
        <SubMovieCard
          shoudlMarginatedAtEnd={true}
          cardFunction={() => {
            navigation.dispatch(
                  DrawerActions.jumpTo('EventDetailScreen', {movieid: item.id})
                );
          }}
          cardWidth={width / 2}
        
          isFirst={index == 0 ? true : false}
          title={item.event_name}
          imagePath={item.event_image}
          style={{margin: 5}} 
        />
      )}
    />

     </View>

      <CategoryHeader title={'رياضة'} postion={'right'} />
      <View style={styles.dirR} >
         <FlatList
  horizontal
  data={[...allEventsList].reverse().filter(item => item.event_category == "رياضة")}
  keyExtractor={(item) => item.id}
  showsHorizontalScrollIndicator={false}
  bounces={false}
  contentContainerStyle={styles.containerGap16}
  renderItem={({ item, index }) => (
    <SubMovieCard
      shoudlMarginatedAtEnd={true}
      cardFunction={() => {
        navigation.dispatch(
                  DrawerActions.jumpTo('EventDetailScreen', {movieid: item.id})
                );
      }}
      cardWidth={width / 2}
      isFirst={index === 0}
      title={item.event_name}
      imagePath={item.event_image}
      style={{ margin: 5 }}
    />
  )}
/>

     </View>


</View>
    </ScrollView>
      </ScrollView>
 
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.BlackTheme,
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
    gap: SPACING.space_4,
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
  dirR: {
    direction: 'rtl'
  }
});

export default HomeScreen;
