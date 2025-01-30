import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery, useQueries } from "@tanstack/react-query";
import {
  getCharacterById,
  getComicById,
  getSeriesById,
  getStoryById,
} from "@/services/marvel-api";
import { Comic, Series, Story } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HorizontalList from "@/components/horizontal-list-old";
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
  const comicQueries = useQueries({
    queries: comicsUrls.map((url) => {
      const comicId = url.split("/").pop();
      return {
        queryKey: ["getComicById", comicId],
        queryFn: () => getComicById(comicId as string),
      };
    }),
  });
  const seriesQueries = useQueries({
    queries: seriesUrls.map((url) => {
      const seriesId = url.split("/").pop();
      return {
        queryKey: ["getSeriesById", seriesId],
        queryFn: () => getSeriesById(seriesId as string),
      };
    }),
  });
  const storiesQueries = useQueries({
    queries: storiesUrls.map((url) => {
      const storyId = url.split("/").pop();
      return {
        queryKey: ["getStoryById", storyId],
        queryFn: () => getStoryById(storyId as string),
      };
    }),
  });
  const isComicsLoading = comicQueries.some((query) => query.isLoading);
  const comicsData = comicQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Comic);

  const isSeriesLoading = seriesQueries.some((query) => query.isLoading);
  const seriesData = seriesQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Series);

  const isStoriesLoading = storiesQueries.some((query) => query.isLoading);
  const storiesData = storiesQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Story);

  const imageURI = `${data?.thumbnail.path}.${data?.thumbnail.extension}`;
  if (isLoading || isComicsLoading || isSeriesLoading || isStoriesLoading) {
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
        <HorizontalList data={comicsData} type="comics" />
        <HorizontalList data={seriesData} type="series" />
        <HorizontalList data={storiesData} type="stories" />
      </View>
    </ScrollView>
  );
};
export default CharacterDetail;
