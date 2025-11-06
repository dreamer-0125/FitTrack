import { login } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

// Responsive sizing helpers
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(formAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/home");
      Alert.alert("Success", "Login successful!");
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Back Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="px-4 sm:px-6 pt-10 sm:pt-12 pb-3 sm:pb-4"
        >
          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="flex-row items-center bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 self-start shadow-sm border border-gray-100"
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={isSmallDevice ? 18 : 20}
              color="#374151"
            />
            <Text className="ml-2 text-sm sm:text-base font-semibold text-gray-700">
              Back
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View className="flex-1 px-4 sm:px-6 justify-center py-4 sm:py-0">
          {/* Logo and Title */}
          <Animated.View
            style={{
              opacity: logoAnim,
              transform: [
                {
                  scale: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            }}
            className="items-center mb-6 sm:mb-10"
          >
            <View className="bg-red-500 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-red-500/25">
              <Ionicons
                name="barbell"
                size={isSmallDevice ? 32 : 40}
                color="white"
              />
            </View>
            <Text className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 sm:mb-3 text-center px-4">
              Welcome Back
            </Text>
            <Text className="text-sm sm:text-base md:text-lg text-gray-600 text-center font-medium px-6 sm:px-8">
              Sign in to continue your fitness journey and achieve your goals
            </Text>
          </Animated.View>

          {/* Login Form */}
          <Animated.View
            style={{
              opacity: formAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-lg shadow-gray-200 border border-gray-100"
          >
            {/* Email Input */}
            <View className="mb-4 sm:mb-6">
              <View className="flex-row items-center mb-2 sm:mb-3">
                <View className="bg-red-500 w-1 h-5 sm:h-6 rounded-full mr-2 sm:mr-3" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Email Address
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email address"
                  className="px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl pr-12 sm:pr-14 focus:border-red-500"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ fontSize: isSmallDevice ? 14 : 16 }}
                />
                <View className="absolute right-3 sm:right-4 top-3 sm:top-4 bg-gray-100 w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl items-center justify-center">
                  <Ionicons
                    name="mail-outline"
                    size={isSmallDevice ? 16 : 18}
                    color="#6b7280"
                  />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6 sm:mb-8">
              <View className="flex-row items-center mb-2 sm:mb-3">
                <View className="bg-red-500 w-1 h-5 sm:h-6 rounded-full mr-2 sm:mr-3" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Password
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your secure password"
                  secureTextEntry={!showPassword}
                  className="px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl pr-12 sm:pr-14 focus:border-red-500"
                  value={password}
                  onChangeText={setPassword}
                  style={{ fontSize: isSmallDevice ? 14 : 16 }}
                />
                <TouchableOpacity
                  className="absolute right-3 sm:right-4 top-3 sm:top-4 bg-gray-100 w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl items-center justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={isSmallDevice ? 16 : 18}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
              className="mb-4 sm:mb-6"
            >
              <View
                className="py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg shadow-red-500/25"
                style={{ backgroundColor: "#dc2626" }}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <>
                      <Ionicons
                        name="log-in-outline"
                        size={isSmallDevice ? 18 : 20}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-base sm:text-lg font-bold text-white">
                        Sign In to Continue
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              className="items-center mb-6 sm:mb-8"
              activeOpacity={0.7}
            >
              <Text className="text-red-600 font-semibold text-sm sm:text-base">
                Forgot your password?
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-5 sm:mb-8">
              <View className="flex-1 h-px bg-gray-200" />
              <View className="bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mx-3 sm:mx-4">
                <Text className="text-gray-500 font-semibold text-xs sm:text-sm">
                  Or continue with
                </Text>
              </View>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <TouchableOpacity
                className="flex-1 bg-gray-50 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  <View className="bg-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl items-center justify-center mr-2 sm:mr-3 shadow-sm">
                    <Ionicons
                      name="logo-google"
                      size={isSmallDevice ? 16 : 18}
                      color="#ea4335"
                    />
                  </View>
                  <Text className="font-bold text-gray-700 text-sm sm:text-base">
                    Google
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-gray-50 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  <View className="bg-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl items-center justify-center mr-2 sm:mr-3 shadow-sm">
                    <Ionicons
                      name="logo-apple"
                      size={isSmallDevice ? 16 : 18}
                      color="#000000"
                    />
                  </View>
                  <Text className="font-bold text-gray-700 text-sm sm:text-base">
                    Apple
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 items-center">
              <View className="flex-row flex-wrap justify-center">
                <Text className="text-gray-600 font-medium text-sm sm:text-base">
                  Don't have an account?{" "}
                </Text>
                <Pressable
                  onPress={() => router.push("/register")}
                  style={{ marginLeft: 4 }}
                >
                  <Text className="text-red-600 font-bold text-sm sm:text-base">
                    Sign Up Now
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Decorative Elements - Hidden on small devices */}
        {!isSmallDevice && (
          <>
            <View className="absolute top-32 right-8 w-20 h-20 sm:w-24 sm:h-24 bg-red-50 rounded-full opacity-20" />
            <View className="absolute bottom-40 left-6 w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full opacity-15" />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
