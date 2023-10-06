import * as React from 'react';
import {Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingComponent = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.toNav) } style={styles.container} >
     
      <View>
        <MaterialCommunityIcons name={props.icon} style={styles.iconStyle} />
      </View>
      <View >
        <Text style={styles.title}>{props.heading}</Text>
      </View>
      

    </TouchableOpacity>
   
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {

    width: '100%',
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },

  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },

});
