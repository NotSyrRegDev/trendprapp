import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CategoryHeader from '../../components/CategoryHeader';
import CastCard from '../../components/CastCard';
import { getDoc , doc , db  , query , collection , getDocs  , where} from '../../../firebase';


const EventDetailAdmin = ({navigation, route}) => {
  const [movieData, setMovieData] = useState(null);
  const [movieCastData, setmovieCastData] = useState(null);
  const [ actorsArray , setActorsArray ] = useState([]);
  const [isLoading , setIsLoading] = useState();

  useEffect(() => {
    const getInfoFromFireStore = async () => {
      const docRef = doc(db, "events", route.params.movieid );
      const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovieData(docSnap.data());
        } else {
          setMovieData(null)
        }
    }
    getInfoFromFireStore();
  } , []);


  
  
  useEffect(() => {
    setIsLoading(true);
  
    const getActorsData = async () => {
      try {
        const q = query(collection(db, "actors") , where("rel_event_id", "==", route.params.movieid )  );
        const querySnapshot = await getDocs(q);
        const actorsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setActorsArray(actorsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    getActorsData();
  }, []);


  if (
   isLoading 
  ) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}>
      
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'light-content'} />

   { /* TOP IMAGEBACKGROUNDWIth CArd */ }
      <View>
        <ImageBackground
          source={{
            uri: movieData?.event_banner,
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: movieData?.event_image } }
          style={styles.cardImage}
        />
         
      </View>

      { /* End TOP IMAGEBACKGROUNDWIth CArd */ }


      { /*  Description And Star */ }
      <View style={styles.infoContainer} className="flex items-center justify-center" >
      <Text  style={styles.textTitle}>
          {movieData?.event_name}
          </Text>
        <View style={styles.rateContainer}>
            <MaterialIcons
          name="star"
          style={[styles.starIcon]}
        />
         
          <Text style={styles.runtimeText}>
            {/* {movieData?.vote_average.toFixed(1)}  */}
            {movieData?.event_rating}
          </Text>
      
        </View>
        <Text style={styles.descriptionText}>{movieData?.event_desc}</Text>
      </View>

      { /* End Description And Star */ }


      { /*  Cast SEction */ }
      <View className="mt-5" >
      {actorsArray && actorsArray.length !== 0 ? (
          <View>
          <CategoryHeader title="الممثلون" />
        <FlatList
          data={actorsArray}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <CastCard
              shouldMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              imagePath={item.actor_thum}
              title={item.actor_name}
              subtitle={item.actor_job}
            />
          )}
        />
          </View>
      ) : (
        ''
      )}

      </View>

      { /* End Cast SEction */ }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: 20,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
    paddingBottom: SPACING.space_15
  },
  runtimeText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  title: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    fontFamily: FONTFAMILY.tajawal_light,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    paddingTop: SPACING.space_15,
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    paddingTop: SPACING.space_15,
    fontFamily: FONTFAMILY.tajawal_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    minWidth: '85%',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.DarkGreen,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  textTitle: {
    paddingTop: SPACING.space_10,
    paddingBottom: SPACING.space_20,
    fontFamily: FONTFAMILY.tajawal_light,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',

  }
});

export default EventDetailAdmin;
