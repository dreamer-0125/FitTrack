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
    <View className="flex-1 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Illustration */}
        <View className="flex-1 relative">
          {/* Background Decorative Elements */}
          <View className="absolute top-20 right-8 w-40 h-40 bg-primary-200 rounded-full opacity-20 blur-3xl" />
          <View className="absolute top-48 left-6 w-32 h-32 bg-accent-200 rounded-full opacity-15 blur-3xl" />
          <View className="absolute bottom-40 right-12 w-28 h-28 bg-primary-300 rounded-full opacity-15 blur-2xl" />

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
            <View className="bg-white/80 backdrop-blur-lg mx-6 rounded-4xl shadow-soft border border-white/50 overflow-hidden">
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg?semt=ais_hybrid&w=740&q=80",
                }}
                style={{
                  width: width - 48,
                  height: height * 0.35,
                  borderRadius: 32,
                }}
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-4xl" />
              <View className="absolute bottom-6 left-6">
                <View className="bg-gradient-to-br from-primary-500 to-primary-600 w-14 h-14 rounded-2xl items-center justify-center mb-3 shadow-glow">
                  <Ionicons name="barbell-outline" size={26} color="white" />
                </View>
                <Text className="text-white font-bold text-xl">
                  Transform Your Body
                </Text>
                <Text className="text-white/90 text-base">
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
            <View className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-soft border border-white/60 mb-8">
              <View className="items-center mb-6">
                <View className="bg-gradient-to-br from-primary-500 to-primary-700 w-20 h-20 rounded-3xl items-center justify-center mb-4 shadow-medium">
                  <Ionicons name="fitness-outline" size={36} color="white" />
                </View>
                <Text className="text-5xl font-black bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-3 tracking-tight">
                  FitTrack
                </Text>
                <Text className="text-lg text-gray-700 text-center font-medium leading-relaxed">
                  Your ultimate fitness companion for tracking workouts,
                  monitoring progress, and achieving your health goals
                </Text>
              </View>

              {/* Feature Highlights */}
              <View className="space-y-4 mb-6">
                <View className="flex-row items-center bg-gradient-to-r from-primary-50 to-transparent p-4 rounded-2xl">
                  <View className="bg-gradient-to-br from-primary-500 to-primary-600 w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm">
                    <Ionicons
                      name="analytics-outline"
                      size={22}
                      color="white"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900 text-base">
                      Track Progress
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Monitor your fitness journey with detailed analytics
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center bg-gradient-to-r from-accent-50 to-transparent p-4 rounded-2xl">
                  <View className="bg-gradient-to-br from-accent-500 to-accent-600 w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm">
                    <Ionicons name="trophy-outline" size={22} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900 text-base">
                      Stay Motivated
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Achieve goals with personalized challenges
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center bg-gradient-to-r from-purple-50 to-transparent p-4 rounded-2xl">
                  <View className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm">
                    <Ionicons name="heart-outline" size={22} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900 text-base">
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
                activeOpacity={0.85}
                className="w-full"
              >
                <View
                  className="py-5 rounded-2xl shadow-medium"
                  style={{ 
                    backgroundColor: '#dc2626',
                    shadowColor: '#dc2626',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name="rocket-outline"
                      size={22}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="text-white text-lg font-bold">
                      Start Your Fitness Journey
                    </Text>
                  </View>
                  <Text className="text-primary-100 text-center text-sm font-medium mt-2">
                    Join thousands of users achieving their goals
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Secondary Information */}
              <View className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 items-center border border-white/50">
                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#16a34a"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-800 font-semibold text-sm">
                    Free to start
                  </Text>
                  <Text className="text-gray-400 mx-3">•</Text>
                  <Ionicons
                    name="shield-checkmark"
                    size={18}
                    color="#16a34a"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-800 font-semibold text-sm">
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
