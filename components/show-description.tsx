import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const descriptions = {
  comics:
    "Individual print and digital comic issues, collections and graphic novels. For example: Amazing Fantasy #15.",
  series:
    "Sequentially numbered (well, mostly sequentially numbered) groups comics with the same title. For example, Uncanny X-Men.",
  stories:
    "Indivisible, reusable components of comics. For example, the cover from Amazing Fantasy #15 or the origin of Spider-Man story from that comic.",
  events: "Big, universe-altering storylines. For example, Infinity",
  creators:
    "Women, men and organizations who create comics. For example, Jack Kirby.",
  characters:
    "The women, men, organizations, alien species, deities, animals, non-corporeal entities, trans-dimensional manifestations, abstract personifications, and green amorphous blobs which occupy the Marvel Universe (and various alternate universes, timelines and altered realities therein). For example, Spider-Man. ",
   marvelverse:"Home"
  };

interface ShowDescriptionProps {
  visible: boolean;
  type: "characters" | "comics" | "series" | "events" | "creators" | "stories" |"marvelverse";
}

const ShowDescription: React.FC<ShowDescriptionProps> = ({ visible, type }) => {
  const translateY = useSharedValue(-100); // Start off-screen (above)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = withTiming(visible ? 100 : -100, { duration: 300 });
  }, [visible]);

  return (
    <>
      {visible && (
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 20,
              right: 20,
              zIndex: 1,
            },
            animatedStyle,
          ]}
        >
          <Animated.View className="h-auto bg-secondaryBackground rounded-md p-4">
            <Text className="text-xl text-white ">{descriptions[type]}</Text>
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};

export default ShowDescription;
