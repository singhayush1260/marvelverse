import { View, Text, ActivityIndicator } from "react-native";
const ListFooter = ({
  title,
  loading,
}: {
  title?: string;
  loading: boolean;
}) => {
  return (
    <View className="items-center justify-center py-8">
      {loading && <ActivityIndicator size="large" color="white" />}
      {!loading && (
        <Text
          style={{ fontFamily: "CaptainAmerica" }}
          className="text-2xl text-white text-center"
        >
          No more {title ? title?.toLocaleLowerCase() : "data"} present.
        </Text>
      )}
    </View>
  );
};
export default ListFooter;
