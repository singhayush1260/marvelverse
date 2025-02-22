import { View, ScrollView } from "react-native";
import ScreenHeader from "@/components/screen-header";
import OverlayContainer from "@/components/overlay-container";
import HorizontalList from "@/components/horizontal-list";
const BACKGROUND_IMAGE = require("../../../assets/images/homebg.jpg");
import { useQuery } from "@tanstack/react-query";
import { getLatestCharacters, getLatestComics, getLatestSeries } from "@/services/marvel-api";
const Home = () => {
  const { data: latestComics, isLoading: isLatestComicsLoading } = useQuery({
    queryKey: ["get-latest-comics"],
    queryFn: () => getLatestComics(),
  });
  const { data: latestSeries, isLoading: isLatestSeriesLoading } = useQuery({
    queryKey: ["get-latest-series"],
    queryFn: () => getLatestSeries(),
  });
  const { data: latestCharacters, isLoading: isLatestCharactersLoading } = useQuery({
    queryKey: ["get-latest-Characters"],
    queryFn: () => getLatestCharacters(),
  });
  const latestComicsUrls=latestComics?.map(latestComic=>latestComic.resourceURI)||[];
  const latestSeriesUrls=latestSeries?.map(latestSeries=>latestSeries.resourceURI)||[];
  const latestCharactersUrls=latestCharacters?.map(latestCharacter=>latestCharacter.resourceURI)||[];
  return (
    <OverlayContainer image={BACKGROUND_IMAGE}>
      <ScreenHeader heading="marvelverse" />
      <ScrollView className="flex-1">
        <View className="pb-16">
        <HorizontalList type="comics" urls={latestComicsUrls} isLatest />
        <HorizontalList type="series" urls={latestSeriesUrls} isLatest />
        <HorizontalList type="characters" urls={latestCharactersUrls} isLatest />
        </View>
      </ScrollView>
    </OverlayContainer>
  );
};
export default Home;
