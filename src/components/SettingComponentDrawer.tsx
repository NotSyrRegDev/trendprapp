import * as React from 'react';
import {Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingComponentDrawer = (props: any) => {
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

export default SettingComponentDrawer;

const styles = StyleSheet.create({
  container: {

    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.space_16,
  },

  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,

  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    marginHorizontal: 15
  },

});
