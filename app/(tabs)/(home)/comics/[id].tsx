import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getComicById } from "@/services/marvel-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import HorizontalList from "@/components/horizontal-list";
const ComicDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getComicById", id],
    queryFn: () => getComicById(id as string),
  });

  const imageUri = useMemo(() => {
    return `${data?.thumbnail?.path}.${data?.thumbnail?.extension}`;
  }, [data]);

  const charactersUrls =
    data?.characters.items.map((comic) => comic.resourceURI) || [];
  const storiesUrls =
    data?.stories.items.map((stories) => stories.resourceURI) || [];
  const creatorsUrls =
    data?.creators.items.map((creators) => creators.resourceURI) || [];

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
            source={{ uri: imageUri }}
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
        <HorizontalList urls={storiesUrls} type="stories" />
        <HorizontalList urls={creatorsUrls} type="creators" />
      </View>
    </ScrollView>
  );
};
export default ComicDetail;
