import { View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const About = () => {
  return (
    <View className="flex-1 ">
      <ImageBackground
        className="flex-1"
        source={require("../../assets/images/about.jpg")}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.9)", // Very dark at the top
            "rgba(0, 0, 0, 0.9)", // Dark in the middle
            "rgba(0, 0, 0, 0.9)", // Semi-dark near the bottom
            "rgba(0, 0, 0, 1)", // Slightly transparent at the very bottom
          ]}
          locations={[0, 0.4, 0.75, 1]} // Control where each color stops
          className="absolute top-0 left-0 right-0 bottom-0 "
        />
        <View className="flex-1 px-4 py-16 justify-end items-end">
          <View>
            <Text
              style={{ fontFamily: "CaptainAmerica" }}
              className="text-white text-5xl uppercase px-4"
            >
              About the app
            </Text>
            <Text
              style={{ fontFamily: "CaptainAmerica" }}
              className="text-white text-xl uppercase px-4 tracking-wide"
            >
              This app is a personal project built using React Native to
              practice mobile development. I’ve used the Marvel API to bring you
              the fascinating world of Marvel Comics. This app is focused on the
              comics universe, not the cinematic one, as Marvel doesn't provide
              a cinematic API. It offers detailed information about your
              favorite characters, comics, creators, and more! While I didn't
              include a search option due to API limitations, you can explore a
              wide range of Marvel's iconic characters and stories!
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default About;
