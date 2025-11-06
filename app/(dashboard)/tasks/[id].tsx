import { useAuth } from "@/context/AuthContext";
import { useLoader } from "@/context/LoaderContext";
import { createTask, getTaskId, updateTask } from "@/services/workoutService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isNew = !id || id === "new";

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();
  const { hideLoader, showLoader } = useLoader();
  const { user } = useAuth();

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnim1 = useRef(new Animated.Value(0)).current;
  const cardAnim2 = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.sequence([
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
      ]),
      Animated.stagger(150, [
        Animated.timing(cardAnim1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const load = async () => {
      if (!isNew && id) {
        try {
          showLoader();
          const task = await getTaskId(id);
          if (task) {
            setTitle(task.title);
            setDescription(task.description);
          }
        } finally {
          hideLoader();
        }
      }
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    try {
      showLoader();
      if (isNew) {
        await createTask({ title, description, userId: user?.uid });
      } else {
        await updateTask(id, { title, description });
      }
      router.back();
    } catch (err) {
      console.error(`Error ${isNew ? "saving" : "updating"} task`, err);
      Alert.alert("Error", `Fail to ${isNew ? "save" : "update"} task`);
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <View className="flex-1 bg-gray-50">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          className="px-6 py-12"
          showsVerticalScrollIndicator={false}
        >
          {/* Animated Header with Glass Effect */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-8"
          >
            <View className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-red-100 shadow-2xl shadow-red-500/10">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className="bg-red-500/20 w-12 h-12 rounded-2xl items-center justify-center mr-4">
                    <Ionicons
                      name={isNew ? "add-circle-outline" : "create-outline"}
                      size={24}
                      color="#dc2626"
                    />
                  </View>
                  <View>
                    <Text className="text-gray-900 text-2xl sm:text-3xl font-bold">
                      {isNew ? "Create Workout" : "Edit Workout"}
                    </Text>
                    <Text className="text-gray-600 text-sm sm:text-base font-medium mt-1">
                      {isNew
                        ? "Design your perfect training session"
                        : "Refine your workout details"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Title Input Card with Modern Glass Design */}
          <Animated.View
            style={{
              opacity: cardAnim1,
              transform: [
                {
                  scale: cardAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
                { translateY: Animated.multiply(cardAnim1, -10) },
              ],
            }}
            className="mb-6"
          >
            <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
              <View className="flex-row items-center mb-4">
                <View className="bg-red-500 w-3 h-8 rounded-full mr-3" />
                <Text className="text-gray-800 text-lg sm:text-xl font-bold">
                  Workout Title
                </Text>
              </View>
              <View className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <TextInput
                  placeholder="Enter your workout name..."
                  placeholderTextColor="#9ca3af"
                  className="px-5 py-4 text-gray-900 text-base sm:text-lg font-medium"
                  value={title}
                  onChangeText={setTitle}
                  style={{ fontSize: 16 }}
                />
              </View>
            </View>
          </Animated.View>

          {/* Description Input Card */}
          <Animated.View
            style={{
              opacity: cardAnim2,
              transform: [
                {
                  scale: cardAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
                { translateY: Animated.multiply(cardAnim2, -10) },
              ],
            }}
            className="mb-8"
          >
            <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
              <View className="flex-row items-center mb-4">
                <View className="bg-red-500 w-3 h-8 rounded-full mr-3" />
                <Text className="text-gray-800 text-lg sm:text-xl font-bold">
                  Description & Notes
                </Text>
              </View>
              <View className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <TextInput
                  placeholder="Describe your workout routine, exercises, sets, and goals..."
                  placeholderTextColor="#9ca3af"
                  className="px-5 py-4 text-gray-900 text-base sm:text-lg font-medium"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  style={{
                    fontSize: 16,
                    minHeight: 120,
                    maxHeight: 180,
                  }}
                />
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons with Gradient and Glass Effect */}
          <Animated.View
            style={{
              opacity: buttonAnim,
              transform: [
                {
                  scale: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              className="mb-4"
            >
              <View className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/25 overflow-hidden">
                <View className="px-8 py-5">
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name={isNew ? "checkmark-circle-outline" : "save-outline"}
                      size={24}
                      color="white"
                      style={{ marginRight: 12 }}
                    />
                    <Text className="text-white text-lg sm:text-xl font-bold">
                      {isNew ? "Create Workout" : "Save Changes"}
                    </Text>
                  </View>
                  <Text className="text-red-100 text-center text-sm font-medium mt-2">
                    {isNew
                      ? "Add this workout to your routine"
                      : "Update workout details"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Cancel/Back Button */}
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
              <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <View className="px-8 py-4">
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name="arrow-back-outline"
                      size={20}
                      color="#6b7280"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="text-gray-600 text-base sm:text-lg font-semibold">
                      Cancel
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Decorative Elements */}
          <View className="absolute top-20 right-6 w-32 h-32 bg-red-50 rounded-full opacity-20" />
          <View className="absolute bottom-40 left-8 w-24 h-24 bg-red-100 rounded-full opacity-10" />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TaskFormScreen;
