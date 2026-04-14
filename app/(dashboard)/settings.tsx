import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { logOut } from "@/services/authService";

const { width } = Dimensions.get("window");

const SettingsScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Logout Failed", error.message || "Something went wrong");
    }
  };

  const settingsOptions = [
    {
      title: "Profile Settings",
      subtitle: "Manage your personal information",
      icon: "person-outline",
      color: "bg-blue-100",
      iconColor: "#2563eb",
    },
    {
      title: "Workout Preferences",
      subtitle: "Customize your training experience",
      icon: "barbell-outline",
      color: "bg-red-100",
      iconColor: "#dc2626",
    },
    {
      title: "Notifications",
      subtitle: "Control your app notifications",
      icon: "notifications-outline",
      color: "bg-yellow-100",
      iconColor: "#ca8a04",
    },
    {
      title: "Privacy & Security",
      subtitle: "Manage your data and security",
      icon: "shield-checkmark-outline",
      color: "bg-green-100",
      iconColor: "#16a34a",
    },
    {
      title: "Help & Support",
      subtitle: "Get help and contact support",
      icon: "help-circle-outline",
      color: "bg-purple-100",
      iconColor: "#9333ea",
    },
    {
      title: "About",
      subtitle: "App version and information",
      icon: "information-circle-outline",
      color: "bg-gray-100",
      iconColor: "#6b7280",
    },
  ];

  return (
    <View className="flex-1 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header with Profile */}
        <View className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-16 pb-8 px-6 mb-6">
          <View className="items-center">
            <View className="relative">
              <Image
                source={{
                  uri: "",
                }}
                className="w-24 h-24 rounded-full border-4 border-white/30"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              />
              <View className="absolute -bottom-2 -right-2 bg-white w-8 h-8 rounded-full items-center justify-center shadow-medium">
                <MaterialIcons name="edit" size={16} color="#dc2626" />
              </View>
            </View>

            <Text className="text-white text-2xl font-bold mt-4 mb-1">
              Dasun Tharaka
            </Text>
            <Text className="text-red-100 text-base">Fitness Enthusiast</Text>

            <View className="flex-row mt-4 space-x-8">
              <View className="items-center">
                <Text className="text-white text-xl font-bold">10</Text>
                <Text className="text-red-100 text-sm">Workouts</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-xl font-bold">12</Text>
                <Text className="text-red-100 text-sm">Days Streak</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-xl font-bold">327</Text>
                <Text className="text-red-100 text-sm">Calories</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="px-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Settings</Text>

          <View className="space-y-3">
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-soft border border-white/60 flex-row items-center"
                activeOpacity={0.7}
              >
                <View
                  className={`${option.color} w-12 h-12 rounded-xl items-center justify-center mr-4`}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={22}
                    color={option.iconColor}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold text-base mb-1">
                    {option.title}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {option.subtitle}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <View className="mt-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </Text>

            <View className="flex-row space-x-3 mb-4">
              <TouchableOpacity className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex-1 items-center shadow-soft border border-white/60">
                <View className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl items-center justify-center mb-3 shadow-sm">
                  <Ionicons name="download-outline" size={22} color="white" />
                </View>
                <Text className="text-gray-900 font-semibold text-sm text-center">
                  Export Data
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex-1 items-center shadow-soft border border-white/60">
                <View className="bg-gradient-to-br from-green-500 to-green-600 w-12 h-12 rounded-xl items-center justify-center mb-3 shadow-sm">
                  <Ionicons name="share-outline" size={22} color="white" />
                </View>
                <Text className="text-gray-900 font-semibold text-sm text-center">
                  Share App
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex-1 items-center shadow-soft border border-white/60">
                <View className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-12 h-12 rounded-xl items-center justify-center mb-3 shadow-sm">
                  <Ionicons name="star-outline" size={22} color="white" />
                </View>
                <Text className="text-gray-900 font-semibold text-sm text-center">
                  Rate Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info Card */}
          <View className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-6 mb-6 shadow-medium">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white text-lg font-bold">
                  FitTrack Pro
                </Text>
                <Text className="text-gray-300 text-sm">Version 2.1.0</Text>
              </View>
              <View className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                <Text className="text-white text-xs font-semibold">
                  PREMIUM
                </Text>
              </View>
            </View>

            <Text className="text-gray-300 text-sm mb-4 leading-5">
              Track your fitness journey with advanced analytics and
              personalized workout plans.
            </Text>

            <TouchableOpacity className="bg-white/15 backdrop-blur-md py-2.5 px-5 rounded-xl self-start border border-white/20">
              <Text className="text-white font-semibold text-sm">
                Learn More
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logout Section */}
          <View className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-soft border border-white/60">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Account Actions
            </Text>

            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.85}
              className="flex-row items-center justify-center py-4 px-5 rounded-xl"
              style={{
                backgroundColor: '#dc2626',
                shadowColor: '#dc2626',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
              }}
            >
              <Ionicons name="log-out-outline" size={22} color="white" />
              <Text className="ml-3 text-white text-lg font-semibold">
                Sign Out
              </Text>
            </TouchableOpacity>

            <Text className="text-center text-gray-600 text-sm mt-4">
              You&apos;ll be redirected to the login screen
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
