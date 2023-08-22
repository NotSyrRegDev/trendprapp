import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
        {maxWidth: props.cardWidth},
      ]}>
      <Image
        source={{uri: props.imagePath}}
        style={[styles.cardImage, {width: props.cardWidth}]}
      />
      <View style={styles.centerContainer} >

      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subtitle}  numberOfLines={1}>
        {props.subtitle}
      </Text>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  cardImage: {
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  title: {
    arginTop: 8,
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  subtitle: {
    marginTop: 8,
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_10,
    color: COLORS.DarkGreen,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CastCard;
