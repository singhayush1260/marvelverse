import { useMemo } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ScreenHeader from "@/components/screen-header";
import OverlayContainer from "@/components/overlay-container";
import { getSeriesInfinite } from "@/services/marvel-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListFooter from "@/components/list-footer";
import ListCard from "@/components/list-card";
import VerticalListLoader from "@/components/vertical-list-loader";
const BACKGROUND_IMAGE = require("../../../../assets/images/comicbg.jpg");

const Series = () => {
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-series"],
      queryFn: ({ pageParam }) => getSeriesInfinite(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextPage,
    });

  const allSeries = useMemo(() => {
    return data?.pages.reduce<any[]>((acc, curr) => {
      return [...acc, ...curr.series];
    }, []);
  }, [data]);

  return (
    <OverlayContainer image={BACKGROUND_IMAGE}>
      <ScreenHeader heading="series" />
      <View className="flex-1 py-10 px-4">
        {isLoading ? (
          // <View className="flex-1 items-center justify-center">
          //   <ActivityIndicator size="large" color="white" />
          // </View>
          <VerticalListLoader/>
        ) : (
          <FlatList
            numColumns={2}
            data={allSeries}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => <ListCard data={item} type="series" />}
            columnWrapperClassName="m-1 justify-between"
            onEndReachedThreshold={0.5}
            onEndReached={() => fetchNextPage()}
            ListFooterComponent={
              <ListFooter title="series" loading={isFetchingNextPage} />
            }
          />
        )}
      </View>
    </OverlayContainer>
  );
};

export default Series;
