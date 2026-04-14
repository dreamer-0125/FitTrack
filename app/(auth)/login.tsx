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
      className="flex-1 bg-gradient-to-br from-gray-50 via-white to-primary-50"
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
            className="flex-row items-center bg-white/80 backdrop-blur-lg rounded-2xl px-4 py-3 self-start shadow-soft border border-white/60"
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
            <View className="bg-gradient-to-br from-primary-500 to-primary-700 w-20 h-20 rounded-3xl items-center justify-center mb-4 shadow-medium">
              <Ionicons
                name="barbell"
                size={isSmallDevice ? 32 : 40}
                color="white"
              />
            </View>
            <Text className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-2 text-center px-4">
              Welcome Back
            </Text>
            <Text className="text-sm sm:text-base text-gray-600 text-center font-medium px-6 sm:px-8">
              Sign in to continue your fitness journey and achieve your goals
            </Text>
          </Animated.View>

          {/* Login Form */}
          <Animated.View
            style={{
              opacity: formAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-soft border border-white/60"
          >
            {/* Email Input */}
            <View className="mb-5 sm:mb-6">
              <View className="flex-row items-center mb-2 sm:mb-3">
                <View className="bg-gradient-to-b from-primary-500 to-primary-600 w-1 h-5 rounded-full mr-2" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Email Address
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email address"
                  className="px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-gray-900 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl pr-12 focus:border-primary-500 focus:shadow-sm"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ fontSize: isSmallDevice ? 14 : 16 }}
                />
                <View className="absolute right-3 top-3.5 bg-primary-100 w-8 h-8 rounded-xl items-center justify-center">
                  <Ionicons
                    name="mail-outline"
                    size={isSmallDevice ? 16 : 18}
                    color="#dc2626"
                  />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6 sm:mb-8">
              <View className="flex-row items-center mb-2 sm:mb-3">
                <View className="bg-gradient-to-b from-primary-500 to-primary-600 w-1 h-5 rounded-full mr-2" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Password
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your secure password"
                  secureTextEntry={!showPassword}
                  className="px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-gray-900 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl pr-14 focus:border-primary-500 focus:shadow-sm"
                  value={password}
                  onChangeText={setPassword}
                  style={{ fontSize: isSmallDevice ? 14 : 16 }}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3.5 bg-primary-100 w-8 h-8 rounded-xl items-center justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={isSmallDevice ? 16 : 18}
                    color="#dc2626"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
              className="mb-4 sm:mb-6"
            >
              <View
                className="py-4 sm:py-5 rounded-2xl shadow-medium"
                style={{ 
                  backgroundColor: '#dc2626',
                  shadowColor: '#dc2626',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                }}
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
              <Text className="text-primary-600 font-semibold text-sm sm:text-base">
                Forgot your password?
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-5 sm:mb-8">
              <View className="flex-1 h-px bg-gray-200" />
              <View className="bg-white/80 px-4 py-2 rounded-full mx-3 border border-gray-100">
                <Text className="text-gray-500 font-semibold text-xs sm:text-sm">
                  Or continue with
                </Text>
              </View>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <TouchableOpacity
                className="flex-1 bg-white/80 backdrop-blur-sm py-3.5 rounded-2xl border border-gray-200 shadow-soft"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  <View className="bg-white w-8 h-8 rounded-xl items-center justify-center mr-2 shadow-sm">
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
                className="flex-1 bg-white/80 backdrop-blur-sm py-3.5 rounded-2xl border border-gray-200 shadow-soft"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  <View className="bg-white w-8 h-8 rounded-xl items-center justify-center mr-2 shadow-sm">
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
            <View className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-4 items-center border border-primary-100">
              <View className="flex-row flex-wrap justify-center">
                <Text className="text-gray-700 font-medium text-sm sm:text-base">
                  Don&apos;t have an account?{" "}
                </Text>
                <Pressable
                  onPress={() => router.push("/register")}
                  style={{ marginLeft: 4 }}
                >
                  <Text className="text-primary-600 font-bold text-sm sm:text-base">
                    Sign Up Now
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Decorative Elements */}
        {!isSmallDevice && (
          <>
            <View className="absolute top-32 right-8 w-24 h-24 bg-primary-200 rounded-full opacity-20 blur-2xl" />
            <View className="absolute bottom-40 left-6 w-20 h-20 bg-accent-200 rounded-full opacity-15 blur-2xl" />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
