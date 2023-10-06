import React, {useEffect, useState , useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SPACING , FONTSIZE , BORDERRADIUS, FONTFAMILY} from '../theme/theme';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import { AuthenticationContext } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');


const SearchScreen = ({navigation , route }) => {

  const { isAuthenticated , searchMovie , foundedMovies } = useContext(AuthenticationContext);
  const [isLoading , setIsLoading] = useState();
  const [error , setError] = useState();



  useEffect(() => {
    setIsLoading(true);
    searchMovie(route.params.searchText);
 setIsLoading(false);
  } , [route.params.searchText]);



  if (
    foundedMovies == undefined &&
    foundedMovies == null 
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar barStyle={'light-content'} />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      </ScrollView>
    );
  }

  return (
    
   <ScrollView style={styles.container} bounces={false}>
   <StatusBar barStyle={'light-content'} />

      {error && (
          <View className=" p-4 text-sm text-white rounded-lg bg-red-500   text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}
    
        <View  >


    {foundedMovies && foundedMovies.length !== 0 ? (
      <View className="mt-3" >
  <CategoryHeader title={'نتائج البحث'} postion={'right'} />
      <FlatList
  data={foundedMovies}
  keyExtractor={(item) => item.id}
  showsHorizontalScrollIndicator={false}
  bounces={false}
  contentContainerStyle={styles.containerGap16}
  numColumns={2}
  renderItem={({ item, index }) => (
    <SubMovieCard
      shoudlMarginatedAtEnd={true}
      cardFunction={() => navigation.navigate('EventDetailScreen', { movieid: item.id })}
      cardWidth={width / 2.2}
      isFirst={index === 0}
      title={item.event_name}
      imagePath={item.event_image}
      style={{ margin: 5 }}
    />
  )}
/>

  </View>
    )  : (
      <View className="mt-2 flex items-center justify-center h-96" >
    <Text style={styles.font} className="block text-white font-bold mb-2 text-lg"  >
        لم يتم العثور على نتائج
      </Text>

      <TouchableOpacity
      className="mt-5 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('ExploreScreen')}>
        <Text style={styles.buttonText}>   رؤية الجميع  </Text>
      </TouchableOpacity>
    </View>

    )}
     




</View>
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

export default SearchScreen;
