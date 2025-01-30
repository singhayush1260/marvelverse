import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useState } from "react";
import ShowDescription from "./show-description";

interface ScreenHeaderProps {
  heading:
    | "characters"
    | "comics"
    | "series"
    | "events"
    | "creators"
    | "stories"
    | "marvelverse"
}

const ScreenHeader = ({ heading }: ScreenHeaderProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className="flex flex-row items-center justify-between p-6 pt-12">
      <TouchableOpacity onPress={openDrawer}>
        <Ionicons name="menu-sharp" size={32} color="white" />
      </TouchableOpacity>
      <Text
        style={{ fontFamily: "CaptainAmerica" }}
        className="text-white text-4xl"
      >
        {heading}
      </Text>
      <TouchableOpacity onPress={() => setShowDescription(!showDescription)}>
        <Ionicons
          name={showDescription ? "close" : "book-sharp"}
          size={32}
          color="white"
        />
      </TouchableOpacity>
      <ShowDescription visible={showDescription} type={heading} />
    </View>
  );
};
export default ScreenHeader;
