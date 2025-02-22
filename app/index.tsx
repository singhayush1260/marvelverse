import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Index = () => {
  const router = useRouter();

  const handleGettingStarted = async () => {
    await AsyncStorage.setItem("alreadyStarted", "true");
    router.push("/(tabs)/(home)");
  };

  return (
    <View className="flex-1 ">
      {/* <StatusBar hidden/> */}
      <ImageBackground
        className="flex-1"
        source={require("../assets/images/ob1.jpg")}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.9)", // Very dark at the top
            "rgba(0, 0, 0, 0.7)", // Dark in the middle
            "rgba(0, 0, 0, 0.7)", // Semi-dark near the bottom
            "rgba(0, 0, 0, 1)", // Slightly transparent at the very bottom
          ]}
          locations={[0, 0.4, 0.75, 1]} // Control where each color stops
          className="absolute top-0 left-0 right-0 bottom-0 "
        />
        <View className="items-center justify-center flex-1 px-4">
          <Text
            style={{ fontFamily: "MarvelRegular" }}
            className="text-white text-6xl bg-marvelPrimary text-center uppercase px-4 pt-2 rounded-sm mb-10"
          >
            Marvel
          </Text>
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-4xl text-white text-center uppercase px-4"
          >
            Discover the Marvel Comic Universe
          </Text>
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-2xl text-white text-center px-6"
          >
            Explore characters, comics, series, stories and legendary creators
          </Text>
          <TouchableOpacity
            className="w-[70%] absolute bottom-28"
            onPress={handleGettingStarted}
          >
            <Text
              style={{ fontFamily: "CaptainAmerica" }}
              className="bg-marvelPrimary rounded-sm text-white text-center text-2xl px-4 py-4"
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Index;
