import { View, Text } from "react-native";
const ListEmpty = ({
  title
}: {
  title?: string;
}) => {
  return (
    <View className="items-center justify-center py-8">
     <Text
          style={{ fontFamily: "CaptainAmerica" }}
          className="text-2xl text-white text-center"
        >
          No  {title ? title?.toLocaleLowerCase() : "data"} present.
        </Text>
    </View>
  );
};
export default ListEmpty;
