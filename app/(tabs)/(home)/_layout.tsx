import React from "react";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#0C0926",
          width: 250,
        },
        drawerItemStyle: {
          backgroundColor: "#24213B",
          marginBottom: 10,
          borderRadius: 2,
        },
        drawerLabelStyle: {
          color: "white",
          fontFamily: "CaptainAmerica",
          fontSize: 16,
          letterSpacing: 2,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="characters"
        options={{
          drawerLabel: "Characters",
        }}
      />
      <Drawer.Screen
        name="comics"
        options={{
          drawerLabel: "Comics",
        }}
      />
      <Drawer.Screen
        name="series"
        options={{
          drawerLabel: "Series",
        }}
      />
      <Drawer.Screen
        name="stories"
        options={{
          drawerLabel: "Stories",
        }}
      />
      <Drawer.Screen
        name="creators"
        options={{
          drawerLabel: "Creators",
        }}
      />
      <Drawer.Screen
        name="events"
        options={{
          drawerLabel: "Events",
        }}
      />
    </Drawer>
  );
};
export default DrawerLayout;
