import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery, useQueries } from "@tanstack/react-query";
import {
  getCharacterById,
  getComicById,
  getCreatorById,
  getSeriesById,
  getStoryById,
} from "@/services/marvel-api";
import { Character, Comic, Creator,Story } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import CharacterCard from "@/components/cards/character-card";
import CreatorCard from "@/components/cards/creator-card";
import MediaCard from "@/components/cards/media-card";
import HorizontalCard from "@/components/horizontal-card-old";
const SeriesDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["getSeriesById", id],
    queryFn: () => getSeriesById(id as string),
  });

  const imageUri = useMemo(() => {
    return `${data?.thumbnail?.path}.${data?.thumbnail?.extension}`;
  }, [data]);

  const charactersUrls =
    data?.characters.items.map((comic) => comic.resourceURI) || [];
  const characterQueries = useQueries({
    queries: charactersUrls.map((characterUrl) => {
      const characterId = characterUrl.split("/").pop();
      return {
        queryKey: ["getCharacterById", characterId],
        queryFn: () => getCharacterById(characterId as string),
      };
    }),
  });
  const isCharactersLoading = characterQueries.some((query) => query.isLoading);
  const charactersData = characterQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Character);

  const comicsUrls = data?.comics.items.map((comic) => comic.resourceURI) || [];
  const comicQueries = useQueries({
    queries: comicsUrls.map((url) => {
      const comicId = url.split("/").pop();
      return {
        queryKey: ["getComicById", comicId],
        queryFn: () => getComicById(comicId as string),
      };
    }),
  });
  const isComicsLoading = comicQueries.some((query) => query.isLoading);
  const comicsData = comicQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Comic);

  const storiesUrls =
    data?.stories.items.map((stories) => stories.resourceURI) || [];

  const storiesQueries = useQueries({
    queries: storiesUrls.map((url) => {
      const storyId = url.split("/").pop();
      return {
        queryKey: ["getStoryById", storyId],
        queryFn: () => getStoryById(storyId as string),
      };
    }),
  });
  const isStoriesLoading = storiesQueries.some((query) => query.isLoading);
  const storiesData = storiesQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data as Story);

  const creatorsUrls =
    data?.creators.items.map((creators) => creators.resourceURI) || [];
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

  if (
    isLoading ||
    isCharactersLoading ||
    isCreatorsLoading ||
    isStoriesLoading ||
    isComicsLoading
  ) {
    return (
      <View className="flex-1 items-center justify-center bg-primaryBackground">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primaryBackground">
      <TouchableOpacity onPress={()=>router.back()} className="absolute top-4 left-4 z-10 p-1 rounded-full bg-black/60">
        <Ionicons name="chevron-back" color="white" size={20}/>
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
        <View className="px-4 gap-4">
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-3xl text-white"
          >
            Characters
          </Text>
          <FlatList
            horizontal
            data={charactersData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <HorizontalCard data={item} type="characters" className="w-44 h-52" />
            )}
            ItemSeparatorComponent={() => <View className="w-4"></View>}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="space-between"
          />
        </View>
        <View className="px-4 gap-4 mt-8">
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-3xl text-white"
          >
            Comics
          </Text>
          <FlatList
            horizontal
            data={comicsData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <HorizontalCard data={item} type="comics" />
            )}
            ItemSeparatorComponent={() => <View className="w-4"></View>}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="space-between"
          />
        </View>
        <View className="px-4 gap-4 mt-8">
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-3xl text-white"
          >
            Creators
          </Text>
          <FlatList
            horizontal
            data={creatorsData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <HorizontalCard data={item} type="creators"/>
            )}
            ItemSeparatorComponent={() => <View className="w-4"></View>}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="px-4 gap-4 mt-8">
          <Text
            style={{ fontFamily: "CaptainAmerica" }}
            className="text-3xl text-white"
          >
            Stories
          </Text>
          <FlatList
            horizontal
            data={storiesData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <HorizontalCard data={item} type="stories" />
            )}
            ItemSeparatorComponent={() => <View className="w-4"></View>}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default SeriesDetail;
