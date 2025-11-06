import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
const tabs = [
  { label: "Home", name: "home", icons: "home" },
  { label: "Workouts", name: "tasks", icons: "check-circle" },

  { label: "Settings", name: "settings", icons: "settings" },
] as const;

const DashBoardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      {tabs.map(({ name, icons, label }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={icons} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default DashBoardLayout;
