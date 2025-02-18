import { useMemo } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ScreenHeader from "@/components/screen-header";
import OverlayContainer from "@/components/overlay-container";
import ListCard from "@/components/list-card";
import { getStoriesInfinite } from "@/services/marvel-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListFooter from "@/components/list-footer";
import VerticalListLoader from "@/components/vertical-list-loader";
const BACKGROUND_IMAGE = require("../../../../assets/images/comicbg.jpg");

const Stories = () => {
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-stories"],
      queryFn: ({ pageParam }) => getStoriesInfinite(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextPage,
    });

  const allStories = useMemo(() => {
    return data?.pages.reduce<any[]>((acc, curr) => {
      return [...acc, ...curr.stories];
    }, []);
  }, [data]);

  return (
    <OverlayContainer image={BACKGROUND_IMAGE}>
      <ScreenHeader heading="stories" />
      <View className="flex-1 py-10 px-4">
        {isLoading ? (
          // <View className="flex-1 items-center justify-center">
          //   <ActivityIndicator size="large" color="white" />
          // </View>
          <VerticalListLoader/>
        ) : (
          <FlatList
            numColumns={2}
            data={allStories}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => <ListCard data={item} type="stories" />}
            columnWrapperClassName="m-1 justify-between"
            onEndReachedThreshold={0.5}
            onEndReached={() => fetchNextPage()}
            ListFooterComponent={
              <ListFooter title="stories" loading={isFetchingNextPage} />
            }
          />
        )}
      </View>
    </OverlayContainer>
  );
};

export default Stories;
