import { ScrollView } from "react-native";
import ScreenHeader from "@/components/screen-header";
import OverlayContainer from "@/components/overlay-container";
import HorizontalList from "@/components/horizontal-list-old";
const BACKGROUND_IMAGE = require("../../../assets/images/homebg.jpg");
import { useQuery } from "@tanstack/react-query";
import { getLatestComics } from "@/services/marvel-api";
const Home = () => {
  const { data: latestComics, isLoading: isLatestComicsLoading } = useQuery({
    queryKey: ["get-latest-comics"],
    queryFn: () => getLatestComics(),
  });

  return (
    <OverlayContainer image={BACKGROUND_IMAGE}>
      <ScreenHeader heading="marvelverse" />
      <ScrollView className="flex-1 pb-16">
        <HorizontalList type="comics" data={latestComics || []} isLatest />
        <HorizontalList type="series" data={latestComics || []} isLatest />
        <HorizontalList type="characters" data={latestComics || []} isLatest />
      </ScrollView>
    </OverlayContainer>
  );
};
export default Home;
