import { useRouter } from "expo-router";
import React, { useRef, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Index = () => {
  const router = useRouter();

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.sequence([
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
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
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Illustration */}
        <View className="flex-1 relative">
          {/* Background Decorative Elements */}
          <View className="absolute top-20 right-8 w-32 h-32 bg-red-50 rounded-full opacity-30" />
          <View className="absolute top-48 left-6 w-24 h-24 bg-red-100 rounded-full opacity-20" />
          <View className="absolute bottom-40 right-12 w-20 h-20 bg-red-50 rounded-full opacity-25" />

          {/* Hero Image Container */}
          <Animated.View
            style={{
              opacity: imageAnim,
              transform: [
                {
                  scale: imageAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            }}
            className="pt-16 pb-8"
          >
            <View className="bg-white mx-6 rounded-3xl shadow-lg shadow-gray-200 border border-gray-100 overflow-hidden">
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg?semt=ais_hybrid&w=740&q=80",
                }}
                style={{
                  width: width - 48,
                  height: height * 0.35,
                  borderRadius: 24,
                }}
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
              <View className="absolute bottom-6 left-6">
                <View className="bg-red-500 w-12 h-12 rounded-2xl items-center justify-center mb-3">
                  <Ionicons name="barbell-outline" size={24} color="white" />
                </View>
                <Text className="text-white font-bold text-lg">
                  Transform Your Body
                </Text>
                <Text className="text-white/80 text-sm">
                  Start your journey today
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Content Section */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="px-6 flex-1 justify-center"
          >
            {/* App Branding */}
            <View className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200 border border-gray-100 mb-8">
              <View className="items-center mb-6">
                <View className="bg-red-500 w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-red-500/25">
                  <Ionicons name="fitness-outline" size={32} color="white" />
                </View>
                <Text className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                  FitTrack
                </Text>
                <Text className="text-lg text-gray-600 text-center font-medium leading-relaxed">
                  Your ultimate fitness companion for tracking workouts,
                  monitoring progress, and achieving your health goals
                </Text>
              </View>

              {/* Feature Highlights */}
              <View className="space-y-4 mb-6">
                <View className="flex-row items-center">
                  <View className="bg-red-100 w-10 h-10 rounded-xl items-center justify-center mr-4">
                    <Ionicons
                      name="analytics-outline"
                      size={20}
                      color="#dc2626"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">
                      Track Progress
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Monitor your fitness journey with detailed analytics
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="bg-red-100 w-10 h-10 rounded-xl items-center justify-center mr-4">
                    <Ionicons name="trophy-outline" size={20} color="#dc2626" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">
                      Stay Motivated
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Achieve goals with personalized challenges
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="bg-red-100 w-10 h-10 rounded-xl items-center justify-center mr-4">
                    <Ionicons name="heart-outline" size={20} color="#dc2626" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">
                      Transform Lifestyle
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Build healthy habits that last a lifetime
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Call to Action Buttons */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    scale: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              }}
              className="space-y-4"
            >
              {/* Primary Button */}
              <TouchableOpacity
                onPress={handleStart}
                activeOpacity={0.8}
                className="w-full"
              >
                <View
                  className="py-5 rounded-2xl shadow-lg shadow-red-500/25"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name="rocket-outline"
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="text-white text-lg font-bold">
                      Start Your Fitness Journey
                    </Text>
                  </View>
                  <Text className="text-red-100 text-center text-sm font-medium mt-2">
                    Join thousands of users achieving their goals
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Secondary Information */}
              <View className="bg-gray-100 rounded-2xl p-4 items-center">
                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color="#dc2626"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-700 font-semibold text-sm">
                    Free to start
                  </Text>
                  <Text className="text-gray-500 mx-2">•</Text>
                  <Ionicons
                    name="shield-checkmark"
                    size={16}
                    color="#dc2626"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-700 font-semibold text-sm">
                    Secure & Private
                  </Text>
                </View>
                <Text className="text-gray-600 text-center text-xs">
                  No credit card required. Cancel anytime.
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
