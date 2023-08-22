import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import {  query , collection , getDocs , db } from "../../firebase";

const {width, height} = Dimensions.get('window');


const HomeScreen = ({navigation}) => {
  
  const [isLoading , setIsLoading] = useState();
  const [error , setError] = useState();

  const [newEventsList, setNewEventsList] =
    useState(null);
    
  const [allEventsList, setAllEventsList] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  
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
  
    getEventsData();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
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
        <StatusBar hidden />

        <View className="flex items-center justify-center mt-2 sticky" >
      <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo} />
      </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />

      <View className="flex items-center justify-center mt-2 sticky" >
      <Image source={require('../assets/icons/logo_color_white.png')} style={styles.logo} />
      </View>

      {error && (
          <View className=" p-4 text-sm text-white rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}
    
     
      <CategoryHeader title={'أحدث المسرحيات'} />
      <FlatList
        data={allEventsList}
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
                navigation.push('EventDetailScreen', {movieid: item.id});
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
     
      <CategoryHeader title={'المسرحيات'} />
      <FlatList
      
  data={allEventsList}
  keyExtractor={(item) => item.id}
  showsHorizontalScrollIndicator={false}
  bounces={false}
  contentContainerStyle={styles.containerGap36}
  numColumns={2}
  renderItem={({item, index}) => (
    <SubMovieCard
      shoudlMarginatedAtEnd={true}
      cardFunction={() => {
        navigation.push('EventDetailScreen', {movieid: item.id});
      }}
      cardWidth={width / 2.3}
    
      isFirst={index == 0 ? true : false}
      // isLast={index == upcomingMoviesList?.length - 1 ? true : false}
      title={item.event_name}
      imagePath={item.event_image}
      style={{margin: 40}} 
    />
  )}
/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
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
});

export default HomeScreen;
