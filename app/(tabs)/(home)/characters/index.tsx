import { useMemo } from "react";
import { View,FlatList, ActivityIndicator } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import ScreenHeader from "@/components/screen-header";
import OverlayContainer from "@/components/overlay-container";
import { getCharactersInfinite } from "@/services/marvel-api";
import ListFooter from "@/components/list-footer";
import ListCard from "@/components/list-card";
import VerticalListLoader from "@/components/vertical-list-loader";


const BACKGROUND_IMAGE = require("../../../../assets/images/charbg.jpg");

const Characters = () => {
  
  const {data,fetchNextPage,isLoading, isFetchingNextPage}=useInfiniteQuery({
    queryKey:["get-characters"],
    queryFn:({pageParam})=>getCharactersInfinite(pageParam),
    initialPageParam:0,
    getNextPageParam: (lastPage) =>
    lastPage?.nextPage
  })

const allCharacters = useMemo(() => {
  return data?.pages.reduce<any[]>((acc, curr) => {
    return [...acc, ...curr.characters];
  }, []);
}, [data]);

  return (
    <OverlayContainer image={BACKGROUND_IMAGE}>
      <ScreenHeader
        heading="characters"
      />
      <View className="flex-1 py-10 px-4">
        {isLoading ? (
          // <View className="flex-1 items-center justify-center">
          //   <ActivityIndicator size="large" color="white" />
          // </View>
          <VerticalListLoader/>
        ) : (
          <FlatList
            numColumns={2}
            data={allCharacters}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({item}) => <ListCard data={item} type="characters" />}
            columnWrapperClassName="m-1 justify-between"
            onEndReachedThreshold={0.5}
            onEndReached={()=>fetchNextPage()}
            ListFooterComponent={<ListFooter title="characters" loading={isFetchingNextPage}/>}
          />
        )}
      </View>
     
    </OverlayContainer>
  );
};

export default Characters;

