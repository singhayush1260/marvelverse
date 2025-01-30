import { View, FlatList } from "react-native";
import { Skeleton } from "moti/skeleton";

const HorizontalListLoader = () => {
  const LoaderItem = () => {
    return (
      <View  className="h-56 w-48 rounded-md p-1 bg-secondaryBackground">
        <Skeleton
          height={190}
          width={"100%"}
          colors={["#24213B", "#0C0926", "#3A3960"]}
        />
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      keyExtractor={(key) => key.toString()}
      renderItem={({ item }) => <LoaderItem />}
      ItemSeparatorComponent={() => <View className="w-4"></View>}
    />
  );
};
export default HorizontalListLoader;
