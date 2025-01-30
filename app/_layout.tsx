import "../global.css";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { useRouter } from "expo-router";
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});



const RootStackLayout = () => {
  const [isReady, setIsReady] = useState(false); // Add a loading state
  const [fontsLoaded, error] = useFonts({
    MarvelRegular: require("../assets/fonts/MarvelRegular-Dj83.ttf"),
    AvengersRegular: require("../assets/fonts/AvengeroRegular-zvgl.ttf"),
    CaptainAmerica: require("../assets/fonts/AmericanCaptain-MdEY.otf"),
  });

  const router = useRouter();

  useEffect(() => {
    const checkIfAlreadyStarted = async () => {
      const hasStarted = await AsyncStorage.getItem("alreadyStarted");
      console.log("has started*********", hasStarted);
      if (hasStarted) {
        setIsReady(true);
      }
      // Mark the app as ready after the check
    };

    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);


  // Don't render anything until the app is ready
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView className="flex-1" behavior="height">
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </QueryClientProvider>
      </KeyboardAvoidingView>
      <Toast/>
    </GestureHandlerRootView>
  );
};

export default RootStackLayout;