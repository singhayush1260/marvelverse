import { View, Text, FlatList } from "react-native";
import { Character, Comic, Creator, Series, Story, Event } from "@/types";
import HorizontalCard from "./horizontal-card";
import ListEmpty from "./list-empty";

interface HorizontalListProps<T> {
  data: T[];
  type: "characters" | "comics" | "series" | "stories" | "events" | "creators";
  isLatest?: boolean;
  inverted?: boolean;
}

const HorizontalListOld = <
  T extends Character | Comic | Series | Story | Event | Creator
>({
  data,
  type,
  isLatest,
  inverted,
}: HorizontalListProps<T>) => {
  return (
    <View className="px-4 mt-8">
      <Text
        style={{ fontFamily: "CaptainAmerica" }}
        className="text-3xl text-white text-end"
      >
        {isLatest ? `Latest ${type}` : type}
      </Text>
      <FlatList
        className="mt-4"
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
    </View>
  );
};

export default HorizontalListOld;
