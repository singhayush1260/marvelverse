import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

interface OverlayContainerProps {
  children: React.ReactNode;
  image: any;
}

const OverlayContainer = ({ children, image }: OverlayContainerProps) => {
  return (
    <SafeAreaView className="flex-1 bg-primaryBackground">
      <ImageBackground className="flex-1" source={image}>
        <LinearGradient
             colors={[
            "rgba(0, 0, 0, 1)", // Very dark at the top
            "rgba(0, 0, 0, 0.9)", // Dark in the middle
            "rgba(0, 0, 0, 0.9)", // Semi-dark near the bottom
            "rgba(0, 0, 0, 1)", // Slightly transparent at the very bottom
          ]}
          locations={[0, 0.4, 0.75, 1]}
          className="w-full h-full"
        >
          {children}
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default OverlayContainer;
