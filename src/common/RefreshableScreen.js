import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';

const RefreshableScreen = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false);

    }, 2000);
  };

  return (
    <ScrollView
    className="bg-black"
      refreshControl={
        <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="white" 
    />
        }
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </ScrollView>
  );
};

export default RefreshableScreen;