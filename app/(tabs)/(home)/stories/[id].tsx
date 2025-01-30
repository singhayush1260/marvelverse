import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@/services/marvel-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import HorizontalList from "@/components/horizontal-list";
const IMAGE_NOT_FOUND = require("../../../../assets/images/imageNotFound.png");

const StoryDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getStoryById", id],
    queryFn: () => getStoryById(id as string),
  });

  const imageUri = useMemo(() => {
    return data?.thumbnail
    ? { uri: `${data.thumbnail.path}.${data.thumbnail.extension}` }
    : IMAGE_NOT_FOUND;
  }, [data]);

  const charactersUrls =
    data?.characters.items.map((comic) => comic.resourceURI) || [];
  const comicsUrls = data?.comics.items.map((comic) => comic.resourceURI) || [];
  const seriesUrls =
    data?.series.items.map((series) => series.resourceURI) || [];
  const creatorsUrls =
    data?.creators.items.map((creators) => creators.resourceURI) || [];
  const eventsUrls =
    data?.events.items.map((events) => events.resourceURI) || [];

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
        <View className="w-full h-80 rounded-md px-8">
          <Image
            source={imageUri}
            className="w-full h-full rounded-md"
            resizeMode="contain"
          />
        </View>
        <View className="px-4 py-8 gap-4">
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-white text-4xl"
          >
            {data?.title}
          </Text>
          <Text className="text-white text-lg tracking-wide">
            {data?.description
              ? data?.description
              : "Description not available."}
          </Text>
        </View>
        <HorizontalList urls={charactersUrls} type="characters" />
        <HorizontalList urls={comicsUrls} type="comics" />
        <HorizontalList urls={seriesUrls} type="series" />
        <HorizontalList urls={creatorsUrls} type="creators" />
        <HorizontalList urls={eventsUrls} type="events" />
      </View>
    </ScrollView>
  );
};
export default StoryDetail;
