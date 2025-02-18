import { View, FlatList } from "react-native";
import { Skeleton } from "moti/skeleton";

const VerticalListLoader = () => {
  const LoaderItem = () => {
    return (
      <View  className="h-56 w-56 rounded-md p-1 bg-secondaryBackground">
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
      numColumns={2}
      showsVerticalScrollIndicator={false}
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      keyExtractor={(key) => key.toString()}
      renderItem={({ item }) => <LoaderItem />}
      ItemSeparatorComponent={() => <View className="w-4"></View>}
      columnWrapperClassName="m-1 justify-between"
    />
  );
};
export default VerticalListLoader;
