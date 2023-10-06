import React from "react";
import {TouchableOpacity , View , Text  , StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";

const Stage = ({stages}) => {


  const scale = useSharedValue(0.4); // Set the initial scale to 0.4
const positionX = useSharedValue(0);
const positionY = useSharedValue(0);

const pinchHandler = useAnimatedGestureHandler({
  onStart: (_, ctx) => {
    // Store the initial scale value
    ctx.scale = scale.value;
  },
  onActive: (event, ctx) => {
    // Update the scale value based on the gesture
    scale.value = event.scale * ctx.scale;
  },
});

  // Gesture handler for pan (drag) gesture
  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // Store the initial position
      ctx.translationX = positionX.value;
      ctx.translationY = positionY.value;
    },
    onActive: (event, ctx) => {
      // Update the position based on the gesture
      positionX.value = event.translationX + ctx.translationX;
      positionY.value = event.translationY + ctx.translationY;
    },
  });

  // Animated style for the red square
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      { scale: scale.value },
    ],
  }));

  const seatsPerRow = 4; // Number of seats in each row


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={panHandler}
        minPointers={1}
        maxPointers={1}
      >
        <Animated.View style={{ flex: 1 }}>
          <PinchGestureHandler
            onGestureEvent={pinchHandler}
            minPointers={2}
            maxPointers={2}
          >
            
            <Animated.View
                style={[
                  {
                    maxHeight: 270,
                    width: '100%',
                    alignSelf: "center",
                  },
                  animatedStyle,
                ]}
              >

<View style={styles.container}>
      {stages.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((seat, seatIndex) => (
            <TouchableOpacity
            
              key={seatIndex}
              onPress={() => {
                selectSeat(
                  rowIndex,
                  seatIndex,
                  seat.number,
                  seat.ticket_category,
                  seat.ticket_price
                );
              }}
              style={[
                styles.seat,
               { padding: 5} ,
                {
                  backgroundColor: seat.selected ? '#12a591' : 'transparent',
                  borderColor:
                    seat.ticket_category === 'bronze'
                      ? '#CD7F32'
                      : seat.ticket_category === 'silver'
                      ? '#4FC3F7'
                      : seat.ticket_category === 'gold'
                      ? '#FFD700'
                      : seat.ticket_category === 'vip'
                      ? '#E91E63'
                      : seat.ticket_category === 'platinum'
                      ? '#7B1FA2'
                      : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.seatText,
                  {
                    color: seat.selected ? 'white' : 'white',
                  },
                ]}
              >
                {seat.number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>

    {/* <View style={styles.container}>
      <View style={styles.column}>
        <Text className="text-white" >000000000000</Text>
        <Text className="text-white" >0000000000000</Text>
        <Text className="text-white" >0000000000000</Text>
        <Text className="text-white" >0000000000000</Text>
      </View>
      <View style={styles.column}>
        <Text className="text-white" >000000000000000</Text>
        <Text className="text-white" >0000000000000000</Text>
        <Text className="text-white" >000000000000000</Text>
        <Text className="text-white" >000000000000000</Text>
      </View>
      <View style={styles.column}>
        <Text className="text-white">00000000000000</Text>
        <Text className="text-white">0000000000000</Text>
        <Text className="text-white">000000000000000</Text>
        <Text className="text-white" >0000000000000000</Text>

      </View>
    </View> */}

              </Animated.View>

          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({ 

  seatIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  seatRow: {
    
    flexDirection: 'row',
    gap: SPACING.space_18,
    marginBottom: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  container: {
    flexDirection: 'column', // Use flexDirection: 'column' to render seats in rows and columns
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust this as needed to control spacing between seats
    marginBottom: 10, // Add spacing between rows
  },
  seat: {
  
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatText: {
    fontSize: 18,
  },

});

export default Stage;