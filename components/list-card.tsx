import { View, Text, Pressable, Image } from "react-native";
import { Character, Comic, Creator, Series, Story, Event } from "@/types";
import { useRouter } from "expo-router";
const IMAGE_NOT_FOUND = require("../assets/images/imageNotFound.png");
interface ListCardProps {
  data: Character | Comic | Series | Story | Event | Creator;
  type: "characters" | "comics" | "series" | "events" | "creators" | "stories";
  className?: string;
}

const ListCard = ({ data, type }: ListCardProps) => {
  let name = "Unknown";
  let imageUri = data.thumbnail
    ? { uri: `${data.thumbnail.path}.${data.thumbnail.extension}` }
    : IMAGE_NOT_FOUND;

  if ("name" in data) {
    name = data.name;
  } else if ("title" in data) {
    name = data.title;
  } else if("firstName" in data && "lastName" in data){
    name=`${data.firstName} ${data.lastName}`;
  }

 

  const router = useRouter();
  return (
    <Pressable
      className="h-72 w-56 rounded-md p-1 bg-secondaryBackground"
      onPress={() => router.push(`/${type}/${data.id}`)}
    >
      <Image source={imageUri} className="w-full h-[80%]" />
      <View className="bg-black/50 h-[20%] w-full py-4 px-2">
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
export default ListCard;
