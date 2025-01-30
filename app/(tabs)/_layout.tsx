import { Tabs } from "expo-router";
import {
  MaterialIcons,
  Fontisto,
  Ionicons

} from "@expo/vector-icons";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
       
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          height: 90,
          paddingTop: 12,
          paddingBottom: 10,
          backgroundColor: "#24213B",
          borderColor: "transparent",
          marginTop:-14
        },
        tabBarLabelStyle:{
         fontSize:12,
         fontFamily:"CaptainAmerica",
         letterSpacing:1
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIconStyle: {
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <Fontisto size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIconStyle: {
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIconStyle: {
            height: 40,
          },
          tabBarIcon: ({ color }) => (
            <Ionicons

              size={28}
              name="information-circle-sharp"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
