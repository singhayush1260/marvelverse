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
  getCreatorById,
  getStoryById,
} from "@/services/marvel-api";
import { Character, Creator, Story } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import HorizontalList from "@/components/horizontal-list-old";
import HorizontalList1 from "@/components/horizontal-list";
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

  // const characterQueries = useQueries({
  //   queries: charactersUrls.map((characterUrl) => {
  //     const characterId = characterUrl.split("/").pop();
  //     return {
  //       queryKey: ["getCharacterById", characterId],
  //       queryFn: () => getCharacterById(characterId as string),
  //     };
  //   }),
  // });
  // const isCharactersLoading = characterQueries.some((query) => query.isLoading);
  // const charactersData = characterQueries
  //   .filter((query) => query.isSuccess)
  //   .map((query) => query.data as Character);

  const creatorsQueries = useQueries({
    queries: creatorsUrls.map((creatorUrl) => {
      const creatorId = creatorUrl.split("/").pop();
      return {
        queryKey: ["getCreatorById", creatorId],
        queryFn: () => getCreatorById(creatorId as string),
      };
    }),
  });
  const isCreatorsLoading = creatorsQueries.some((query) => query.isLoading);
  const creatorsData = creatorsQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Creator);

  // const storiesQueries = useQueries({
  //   queries: storiesUrls.map((url) => {
  //     const storyId = url.split("/").pop();
  //     return {
  //       queryKey: ["getStoryById", storyId],
  //       queryFn: () => getStoryById(storyId as string),
  //     };
  //   }),
  // });
  // const isStoriesLoading = storiesQueries.some((query) => query.isLoading);
  // const storiesData = storiesQueries
  //   .filter((query) => query.isSuccess)
  //   .map((query) => query.data as Story);

  if (
    isLoading 
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
            {data?.title}
          </Text>
          <Text className="text-white text-lg tracking-wide">
            {data?.description
              ? data?.description
              : "Description not available."}
          </Text>
        </View>
        <HorizontalList1 urls={charactersUrls} type="characters"/>
        <HorizontalList1 urls={storiesUrls} type="stories"/>
        <HorizontalList1 urls={creatorsUrls} type="creators"/>
        {/* <HorizontalList data={creatorsData} type="creators"/> */}
      </View>
    </ScrollView>
  );
};
export default ComicDetail;
