import { View, Text, Pressable, Image } from "react-native";
import { Character, Comic, Creator, Series, Story, Event } from "@/types";
import { useRouter } from "expo-router";
const IMAGE_NOT_FOUND = require("../assets/images/imageNotFound.png");
interface HorizontalCardProps {
  data: Character | Comic | Series | Story | Event | Creator;
  type: "characters" | "comics" | "series" | "events" | "creators" | "stories";
  className?: string;
}

const HorizontalCard = ({ data, type }: HorizontalCardProps) => {
  let name = "Unknown";
  let imageUri = data.thumbnail
    ? { uri: `https:${data.thumbnail.path.split(":")[1]}.${data.thumbnail.extension}` }
    : IMAGE_NOT_FOUND;

  if ("name" in data) {
    name = data.name;
  } else if ("title" in data) {
    name = data.title;
  }else if("firstName" in data && "lastName" in data){
    name=`${data.firstName} ${data.lastName}`;
  }

  const router = useRouter();
  return (
    <Pressable
      className="h-56 w-48 rounded-md p-1 bg-secondaryBackground"
      onPress={() => router.push(`/${type}/${data.id}`)}
    >
      <Image source={imageUri} className="w-full h-full" resizeMode="cover" />
      <View className="bg-black/80 h-auto absolute bottom-1 left-1 w-full py-4">
        <Text
          style={{ fontFamily: "CaptainAmerica" }}
          className="text-xl text-white"
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
};
export default HorizontalCard;
