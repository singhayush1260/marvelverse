import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery, useQueries } from "@tanstack/react-query";
import {
  getComicById,
  getCreatorById,
  getEventById,
  getSeriesById,
  getStoryById,
} from "@/services/marvel-api";
import { Comic, Series, Story, Event } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import HorizontalCard from "@/components/horizontal-card-old";
import ListEmpty from "@/components/list-empty";
import HorizontalList from "@/components/horizontal-list-old";

const CreatorDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getCreatorById", id],
    queryFn: () => getCreatorById(id as string),
  });

  const imageUri = useMemo(() => {
    return `${data?.thumbnail?.path}.${data?.thumbnail?.extension}`;
  }, [data]);

  const comicsUrls = data?.comics.items.map((comic) => comic.resourceURI) || [];
  const seriesUrls =
    data?.series.items.map((series) => series.resourceURI) || [];
  const storiesUrls =
    data?.stories.items.map((stories) => stories.resourceURI) || [];
  const eventsUrls =
    data?.events.items.map((events) => events.resourceURI) || [];

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

  const eventsQueries = useQueries({
    queries: eventsUrls.map((url) => {
      const eventId = url.split("/").pop();
      return {
        queryKey: ["getEventById", eventId],
        queryFn: () => getEventById(eventId as string),
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

  const isEventsLoading = eventsQueries.some((query) => query.isLoading);
  const eventsData = eventsQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Event);

  if (
    isLoading ||
    isComicsLoading ||
    isSeriesLoading ||
    isStoriesLoading ||
    isEventsLoading
  ) {
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
            {data?.firstName + " " + data?.lastName}
          </Text>
          {/* <Text className="text-white text-lg tracking-wide">{data?.description ? data?.description:"Description not available."}</Text> */}
        </View>
        <HorizontalList data={comicsData} type="comics"/>
        <HorizontalList data={seriesData} type="series"/>
        <HorizontalList data={storiesData} type="stories"/>
        <HorizontalList data={eventsData} type="events"/>
      </View>
    </ScrollView>
  );
};
export default CreatorDetail;
