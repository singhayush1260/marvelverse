import { View, Text, FlatList } from "react-native";
import { useQueries } from "@tanstack/react-query";
import {
  getCharacterById,
  getComicById,
  getEventById,
  getSeriesById,
  getStoryById,
  getCreatorById,
} from "@/services/marvel-api";
import { Character, Comic, Series, Story, Event, Creator } from "@/types";
import HorizontalCard from "./horizontal-card";
import ListEmpty from "./list-empty";
import HorizontalListLoader from "./horizontal-list-loader";

interface HorizontalListProps {
  urls: string[];
  type: "characters" | "comics" | "series" | "stories" | "events" | "creators";
  isLatest?: boolean;
  inverted?: boolean;
}

const fetchFunction = {
  characters: getCharacterById,
  comics: getComicById,
  series: getSeriesById,
  stories: getStoryById,
  events: getEventById,
  creators: getCreatorById,
};

const HorizontalList = ({
  urls,
  type,
  isLatest,
  inverted,
}: HorizontalListProps) => {
  const ids = urls.map((url) => url.split("/").pop() as string);
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: [type, id],
      queryFn: () => fetchFunction[type](id),
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const data = queries
    .filter((query) => query.isSuccess)
    .map(
      (query) =>
        query.data as Character | Comic | Series | Story | Event | Creator
    );

  const RenderLoader = () => {
    return (
      <View className="mt-8">
       <HorizontalListLoader/>
      </View>
    );
  };

  const RenderFlatList = () => {
    return (
      <FlatList
        horizontal
        data={data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <HorizontalCard data={item} type={type} />}
        ItemSeparatorComponent={() => <View className="w-4"></View>}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="space-between"
        inverted={inverted}
        ListEmptyComponent={<ListEmpty title={type} />}
      />
    );
  };

  return (
    <View className="px-4 mt-8">
      <Text
        style={{ fontFamily: "CaptainAmerica" }}
        className="text-3xl text-white mb-4"
      >
        {isLatest ? `Latest ${type}` : type}
      </Text>
      {isLoading ? <HorizontalListLoader/> : <RenderFlatList />}
    </View>
  );
};

export default HorizontalList;
