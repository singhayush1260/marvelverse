import { useMemo } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ScreenHeader from "@/components/screen-header";
import OverlayContainer from "@/components/overlay-container";
import { getComicsInfinite } from "@/services/marvel-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListFooter from "@/components/list-footer";
import ListCard from "@/components/list-card";
import VerticalListLoader from "@/components/vertical-list-loader";
const BACKGROUND_IMAGE = require("../../../../assets/images/comicbg.jpg");

const Comics = () => {
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-comics"],
      queryFn: ({ pageParam }) => getComicsInfinite(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextPage,
    });

  const allComics = useMemo(() => {
    return data?.pages.reduce<any[]>((acc, curr) => {
      return [...acc, ...curr.comics];
    }, []);
  }, [data]);

  return (
    <OverlayContainer image={BACKGROUND_IMAGE}>
      <ScreenHeader heading="comics" />
      <View className="flex-1 py-10 px-4">
        {isLoading ? (
          // <View className="flex-1 items-center justify-center">
          //   <ActivityIndicator size="large" color="white" />
          // </View>
          <VerticalListLoader/>
        ) : (
          <FlatList
            numColumns={2}
            data={allComics}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => <ListCard data={item} type="comics" />}
            columnWrapperClassName="m-1 justify-between"
            onEndReachedThreshold={0.5}
            onEndReached={() => fetchNextPage()}
            ListFooterComponent={
              <ListFooter title="comics" loading={isFetchingNextPage} />
            }
          />
        )}
      </View>
    </OverlayContainer>
  );
};

export default Comics;
