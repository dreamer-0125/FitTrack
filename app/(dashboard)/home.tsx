import React, { useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardAnim1 = useRef(new Animated.Value(0)).current;
  const cardAnim2 = useRef(new Animated.Value(0)).current;
  const motivationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animations for smooth entrance
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(200, [
        Animated.timing(cardAnim1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(motivationAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const quickStats = [
    {
      label: "Today's Goal",
      value: "45 min",
      icon: "timer-outline",
      color: "bg-red-100",
      iconColor: "#dc2626",
    },
    {
      label: "Calories Burned",
      value: "327",
      icon: "flame-outline",
      color: "bg-red-100",
      iconColor: "#dc2626",
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: "trophy-outline",
      color: "bg-red-100",
      iconColor: "#dc2626",
    },
  ];

  // Calculate responsive dimensions
  const cardWidth = Math.min((width - 72) / 2, 160);
  const statCardWidth = Math.min((width - 96) / 2.5, 140);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="px-4 pt-12 pb-4"
        >
          {/* Header Section with Modern Card Design */}
          <View className="mb-6">
            <View className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200 border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="bg-red-500 w-14 h-14 rounded-2xl items-center justify-center mr-4">
                  <Ionicons name="person-outline" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    Welcome back 👋
                  </Text>
                  <Text className="text-base sm:text-lg text-gray-600 font-medium">
                    {user?.displayName || "Gym Enthusiast"}, ready to crush your
                    goals?
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Overview with Enhanced Cards */}
          <View className="mb-6">
            <Text className="text-lg sm:text-xl font-bold text-gray-800 mb-4 px-2">
              Today's Overview
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16, paddingLeft: 8 }}
              className="overflow-visible"
            >
              {quickStats.map((stat, index) => (
                <Animated.View
                  key={stat.label}
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: Animated.multiply(slideAnim, index * 0.5),
                      },
                    ],
                    width: statCardWidth,
                    marginRight: 12,
                  }}
                >
                  <View className="bg-white rounded-3xl p-5 shadow-lg shadow-gray-200 border border-gray-100 min-h-36">
                    <View
                      className={`${stat.color} w-12 h-12 rounded-2xl items-center justify-center mb-4`}
                    >
                      <Ionicons
                        name={stat.icon as any}
                        size={22}
                        color={stat.iconColor}
                      />
                    </View>
                    <Text className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {stat.value}
                    </Text>
                    <Text className="text-xs sm:text-sm text-gray-600 font-semibold leading-snug">
                      {stat.label}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </ScrollView>
          </View>

          {/* Quick Action Cards with Modern Design */}
          <View className="mb-6">
            <Text className="text-lg sm:text-xl font-bold text-gray-800 mb-4 px-2">
              Quick Actions
            </Text>
            <View className="flex-row space-x-4 px-2">
              <Animated.View
                style={{
                  opacity: cardAnim1,
                  transform: [
                    {
                      scale: cardAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200 border border-gray-100 min-h-48"
                  onPress={() => router.push("/(dashboard)/tasks")}
                  activeOpacity={0.85}
                >
                  <View className="bg-red-500 w-16 h-16 rounded-2xl items-center justify-center mb-4">
                    <Ionicons name="barbell-outline" size={28} color="white" />
                  </View>
                  <Text className="text-gray-900 text-lg sm:text-xl font-bold mb-2 leading-tight">
                    Workouts
                  </Text>
                  <Text className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
                    View & manage your training sessions
                  </Text>
                  <View className="flex-row items-center mt-3">
                    <Text className="text-red-600 font-semibold text-sm mr-2">
                      Get Started
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#dc2626" />
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: cardAnim2,
                  transform: [
                    {
                      scale: cardAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200 border border-gray-100 min-h-48"
                  onPress={() => router.push("/(dashboard)/settings")}
                  activeOpacity={0.85}
                >
                  <View className="bg-gray-800 w-16 h-16 rounded-2xl items-center justify-center mb-4">
                    <Ionicons name="settings-outline" size={28} color="white" />
                  </View>
                  <Text className="text-gray-900 text-lg sm:text-xl font-bold mb-2 leading-tight">
                    Settings
                  </Text>
                  <Text className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
                    Customize your profile & app preferences
                  </Text>
                  <View className="flex-row items-center mt-3">
                    <Text className="text-gray-700 font-semibold text-sm mr-2">
                      Customize
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#374151" />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* Progress Section with Enhanced Design */}
          <Animated.View
            style={{
              opacity: motivationAnim,
              transform: [
                {
                  translateY: motivationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}
            className="bg-white rounded-3xl p-6 mb-6 shadow-lg shadow-gray-200 border border-gray-100"
          >
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <View className="bg-red-100 w-12 h-12 rounded-2xl items-center justify-center mr-3">
                  <Ionicons
                    name="analytics-outline"
                    size={24}
                    color="#dc2626"
                  />
                </View>
                <Text className="text-lg sm:text-xl font-bold text-gray-800">
                  Weekly Progress
                </Text>
              </View>
              <TouchableOpacity className="bg-red-50 px-4 py-2 rounded-2xl border border-red-100">
                <Text className="text-red-600 font-semibold text-xs sm:text-sm">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-end mb-6 px-2">
              {[65, 80, 45, 90, 75, 60, 85].map((height, index) => (
                <View key={index} className="items-center flex-1 max-w-8">
                  <View
                    style={{
                      height: Math.max(height * 0.8, 30),
                      width: Math.min((width - 140) / 7, 24),
                      backgroundColor: "#dc2626",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      marginBottom: 12,
                      marginLeft: "auto",
                      marginRight: "auto",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}
                  />
                  <Text className="text-xs text-gray-500 font-semibold">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row justify-between items-center bg-gray-50 rounded-2xl p-4">
              <View>
                <Text className="text-3xl font-bold text-gray-900">78%</Text>
                <Text className="text-sm text-gray-600 font-medium">
                  Weekly Goal
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-red-600 font-bold text-base">
                  +12% from last week
                </Text>
                <Text className="text-sm text-gray-600">Keep it up! 🔥</Text>
              </View>
            </View>
          </Animated.View>

          {/* Motivation Section with Enhanced Gradient */}
          <Animated.View
            style={{
              opacity: motivationAnim,
              transform: [
                {
                  scale: motivationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
              backgroundColor: "#dc2626",
              borderRadius: 24,
              padding: 32,
              marginBottom: 24,
              shadowColor: "#dc2626",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
            }}
          >
            <View className="items-center">
              <View className="bg-white/20 w-16 h-16 rounded-2xl items-center justify-center mb-4">
                <Text className="text-3xl">💪</Text>
              </View>
              <Text className="text-white text-xl sm:text-2xl font-bold mb-4 text-center">
                Stay Strong & Focused!
              </Text>
              <Text className="text-red-100 text-base sm:text-lg text-center leading-7 mb-6 px-2">
                "Success isn't given. It's earned in the gym, on the field, in
                every quiet moment when you choose to push harder."
              </Text>
              <TouchableOpacity className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30">
                <View className="flex-row items-center">
                  <Ionicons
                    name="play-outline"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-white font-bold text-base">
                    Start Workout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Recent Activity with Enhanced Design */}
          <View className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200 border border-gray-100">
            <View className="flex-row items-center mb-6">
              <View className="bg-red-100 w-12 h-12 rounded-2xl items-center justify-center mr-3">
                <Ionicons name="time-outline" size={24} color="#dc2626" />
              </View>
              <Text className="text-lg sm:text-xl font-bold text-gray-800">
                Recent Activity
              </Text>
            </View>

            <View className="space-y-5">
              <View className="flex-row items-center bg-gray-50 rounded-2xl p-4">
                <View className="bg-red-100 w-12 h-12 rounded-2xl items-center justify-center mr-4 flex-shrink-0">
                  <MaterialIcons
                    name="fitness-center"
                    size={20}
                    color="#dc2626"
                  />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="font-bold text-gray-800 text-base">
                    Push Day Workout
                  </Text>
                  <Text className="text-sm text-gray-600 font-medium">
                    45 minutes • 2 hours ago
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-red-600 font-bold text-base">327</Text>
                  <Text className="text-xs text-gray-500 font-medium">
                    calories
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center bg-gray-50 rounded-2xl p-4">
                <View className="bg-orange-100 w-12 h-12 rounded-2xl items-center justify-center mr-4 flex-shrink-0">
                  <MaterialIcons
                    name="directions-run"
                    size={20}
                    color="#ea580c"
                  />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="font-bold text-gray-800 text-base">
                    Morning Run
                  </Text>
                  <Text className="text-sm text-gray-600 font-medium">
                    30 minutes • Yesterday
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-orange-600 font-bold text-base">
                    245
                  </Text>
                  <Text className="text-xs text-gray-500 font-medium">
                    calories
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center bg-gray-50 rounded-2xl p-4">
                <View className="bg-yellow-100 w-12 h-12 rounded-2xl items-center justify-center mr-4 flex-shrink-0">
                  <MaterialIcons
                    name="self-improvement"
                    size={20}
                    color="#ca8a04"
                  />
                </View>
                <View className="flex-1 min-w-0">
                  <Text className="font-bold text-gray-800 text-base">
                    Yoga Session
                  </Text>
                  <Text className="text-sm text-gray-600 font-medium">
                    60 minutes • 2 days ago
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-yellow-600 font-bold text-base">
                    180
                  </Text>
                  <Text className="text-xs text-gray-500 font-medium">
                    calories
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Decorative Elements */}
      <View className="absolute top-24 right-8 w-32 h-32 bg-red-50 rounded-full opacity-30" />
      <View className="absolute bottom-48 left-6 w-20 h-20 bg-red-100 rounded-full opacity-20" />
    </View>
  );
};

export default Home;
