import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const CategoryHeader = (props: any) => {
  return <Text style={styles.text} className={props.postion == "center" ? "text-center" : "text-right"} >{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    paddingTop: SPACING.space_20,
    paddingBottom: SPACING.space_20,
    fontFamily: FONTFAMILY.cairo_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.DarkGreen,
    marginBottom: 10,
  
  },
});

export default CategoryHeader;
