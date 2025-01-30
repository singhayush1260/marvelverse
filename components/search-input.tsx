import React, { useEffect } from "react";
import { TextInput } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface SearchInputProps {
  visible: boolean;
 onChangeText:(query:string)=>void;
}

const SearchInput: React.FC<SearchInputProps> = ({ visible,onChangeText }) => {
  const translateY = useSharedValue(-100); // Start off-screen (above)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = withTiming(visible ? 100 : -100, { duration: 300 });
  }, [visible]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "white",
          padding: 16,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    >
      {visible && (
        <TextInput
          placeholder="Search character..."
          style={{
            fontFamily: "CaptainAmerica",
            letterSpacing: 1.5,
          }}
          autoFocus
          onChangeText={onChangeText}
        />
      )}
    </Animated.View>
  );
};

export default SearchInput;
