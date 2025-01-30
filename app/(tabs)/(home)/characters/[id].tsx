import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "@/services/marvel-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HorizontalList from "@/components/horizontal-list";
const CharacterDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getCharacterById"],
    queryFn: async () => getCharacterById(id.toString()),
  });
  const comicsUrls = data?.comics.items.map((comic) => comic.resourceURI) || [];
  const seriesUrls =
    data?.series.items.map((series) => series.resourceURI) || [];
  const storiesUrls =
    data?.stories.items.map((stories) => stories.resourceURI) || [];

  const imageURI = `${data?.thumbnail.path}.${data?.thumbnail.extension}`;
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primaryBackground">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primaryBackground">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-4 left-4 z-10 p-1 rounded-full bg-black/60"
      >
        <Ionicons name="chevron-back" color="white" size={20} />
      </TouchableOpacity>
      <View className="py-8">
        <View className="w-full h-80 rounded-md">
          <Image
            source={{ uri: imageURI }}
            className="w-full h-full rounded-md"
            resizeMode="contain"
          />
        </View>
        <View className="px-4 py-8 gap-4">
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-white text-4xl"
          >
            {data?.name}
          </Text>
          <Text className="text-white text-lg tracking-wide">
            {data?.description
              ? data?.description
              : "Description not available."}
          </Text>
        </View>
        <HorizontalList urls={comicsUrls} type="comics" />
        <HorizontalList urls={seriesUrls} type="series" />
        <HorizontalList urls={storiesUrls} type="stories" />
      </View>
    </ScrollView>
  );
};
export default CharacterDetail;
