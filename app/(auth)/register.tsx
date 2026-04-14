import { register } from "@/services/authService";
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

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleRegister = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Please enter your full name");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email address");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter a password");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long"
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      Alert.alert(
        "Success",
        "Registration successful! Please sign in to continue."
      );
      router.back();
    } catch (error: any) {
      console.log(error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      }

      Alert.alert("Registration Failed", errorMessage);
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
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
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
            onPress={() => router.back()}
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

        <View className="flex-1 px-4 sm:px-6 justify-center py-4 sm:py-6">
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
            className="items-center mb-5 sm:mb-8"
          >
            <View className="bg-gradient-to-br from-primary-500 to-primary-700 w-20 h-20 rounded-3xl items-center justify-center mb-4 shadow-medium">
              <Ionicons
                name="person-add"
                size={isSmallDevice ? 32 : 40}
                color="white"
              />
            </View>
            <Text className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-2 text-center px-4">
              Join FitTrack
            </Text>
            <Text className="text-sm sm:text-base text-gray-600 text-center font-medium px-6 sm:px-8">
              Create your account to start your fitness journey and achieve your
              goals
            </Text>
          </Animated.View>

          {/* Registration Form */}
          <Animated.View
            style={{
              opacity: formAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-soft border border-white/60 mb-4 sm:mb-8"
          >
            {/* Full Name Input */}
            <View className="mb-4 sm:mb-5">
              <View className="flex-row items-center mb-2">
                <View className="bg-gradient-to-b from-primary-500 to-primary-600 w-1 h-5 rounded-full mr-2" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Full Name
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your full name"
                  className="px-4 sm:px-5 py-3.5 text-sm sm:text-base text-gray-900 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl pr-12 focus:border-primary-500 focus:shadow-sm"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  style={{ fontSize: isSmallDevice ? 14 : 16 }}
                />
                <View className="absolute right-3 top-3.5 bg-primary-100 w-8 h-8 rounded-xl items-center justify-center">
                  <Ionicons
                    name="person-outline"
                    size={isSmallDevice ? 16 : 18}
                    color="#dc2626"
                  />
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-4 sm:mb-5">
              <View className="flex-row items-center mb-2">
                <View className="bg-gradient-to-b from-primary-500 to-primary-600 w-1 h-5 rounded-full mr-2" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Email Address
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email address"
                  className="px-4 sm:px-5 py-3.5 text-sm sm:text-base text-gray-900 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl pr-12 focus:border-primary-500 focus:shadow-sm"
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
            <View className="mb-4 sm:mb-5">
              <View className="flex-row items-center mb-2">
                <View className="bg-gradient-to-b from-primary-500 to-primary-600 w-1 h-5 rounded-full mr-2" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Password
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder={
                    isSmallDevice
                      ? "Min. 6 characters"
                      : "Enter secure password (min. 6 characters)"
                  }
                  secureTextEntry={!showPassword}
                  className="px-4 sm:px-5 py-3.5 text-sm sm:text-base text-gray-900 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl pr-14 focus:border-primary-500 focus:shadow-sm"
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

            {/* Confirm Password Input */}
            <View className="mb-6 sm:mb-8">
              <View className="flex-row items-center mb-2">
                <View className="bg-gradient-to-b from-primary-500 to-primary-600 w-1 h-5 rounded-full mr-2" />
                <Text className="text-gray-800 font-bold text-sm sm:text-base">
                  Confirm Password
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  className="px-4 sm:px-5 py-3.5 text-sm sm:text-base text-gray-900 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl pr-14 focus:border-primary-500 focus:shadow-sm"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={{ fontSize: isSmallDevice ? 14 : 16 }}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3.5 bg-primary-100 w-8 h-8 rounded-xl items-center justify-center"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={isSmallDevice ? 16 : 18}
                    color="#dc2626"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
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
                        name="person-add-outline"
                        size={isSmallDevice ? 18 : 20}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-base sm:text-lg font-bold text-white">
                        Create Your Account
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <View className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-4 mb-6 border border-primary-200">
              <Text className="text-center text-xs sm:text-sm text-gray-700 leading-5">
                By creating an account, you agree to our{" "}
                <Text className="text-primary-600 font-bold">Terms of Service</Text>{" "}
                and{" "}
                <Text className="text-primary-600 font-bold">Privacy Policy</Text>
              </Text>
            </View>

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

            {/* Social Registration Buttons */}
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

            {/* Login Link */}
            <View className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-4 items-center border border-accent-100">
              <View className="flex-row flex-wrap justify-center">
                <Text className="text-gray-700 font-medium text-sm sm:text-base">
                  Already have an account?{" "}
                </Text>
                <Pressable
                  onPress={() => router.back()}
                  style={{ marginLeft: 4 }}
                >
                  <Text className="text-primary-600 font-bold text-sm sm:text-base">
                    Sign In Here
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

export default Register;
