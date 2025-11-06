import { useLoader } from "@/context/LoaderContext";
import { deleteTask, taskRef } from "@/services/workoutService";
import { Task } from "@/types/task";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const TaskScreen = () => {
  const [task, setTask] = useState<Task[]>([]);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fabAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(fabAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const unsubscribe = onSnapshot(taskRef, (snap) => {
      const taskList = snap.docs.map((task) => {
        const data = task.data();
        return {
          id: task.id,
          title:
            data.title || (data.taskData && data.taskData.title) || "Untitled",
          description:
            data.description ||
            (data.taskData && data.taskData.description) ||
            "",
        };
      });
      setTask(taskList);
    });
    return () => unsubscribe();
  }, []);

  const handelDelete = async (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            showLoader();
            await deleteTask(id);
            Alert.alert("Task deleted successfully");
          } catch (error) {
            console.error("Error deleting task:", error);
            Alert.alert("Failed to delete task");
          } finally {
            hideLoader();
          }
        },
      },
    ]);
  };

  const TaskCard = ({ task, index }: { task: Task; index: number }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: cardAnim,
          transform: [
            {
              translateY: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
            {
              scale: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
        }}
        className="mb-4"
      >
        <View className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200 border border-gray-100">
          {/* Card Header with Icon */}
          <View className="flex-row items-start mb-4">
            <View className="bg-red-100 w-12 h-12 rounded-2xl items-center justify-center mr-4 flex-shrink-0">
              <Ionicons name="barbell-outline" size={22} color="#dc2626" />
            </View>
            <View className="flex-1 min-w-0">
              <Text className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                {task.title}
              </Text>
              {task.description && (
                <Text className="text-gray-600 text-base leading-relaxed">
                  {task.description}
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-end space-x-4 pt-4 border-t border-gray-100">
            <TouchableOpacity
              className="flex-row items-center bg-gray-50 px-4 py-2.5 rounded-xl"
              onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="edit" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700 font-semibold text-sm">
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-red-50 px-4 py-2.5 rounded-xl"
              onPress={() => {
                console.log("Deleting task:", task.id);
                handelDelete(task.id || "");
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="delete-outline" size={20} color="#dc2626" />
              <Text className="ml-2 text-red-600 font-semibold text-sm">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  const EmptyState = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="items-center justify-center mt-16"
    >
      <View className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200 border border-gray-100 mx-4">
        <View className="bg-red-100 w-20 h-20 rounded-full items-center justify-center mx-auto mb-6">
          <Ionicons name="barbell-outline" size={32} color="#dc2626" />
        </View>
        <Text className="text-xl font-bold text-gray-900 text-center mb-3">
          No Workouts Yet
        </Text>
        <Text className="text-gray-600 text-center text-base leading-relaxed mb-6">
          Start your fitness journey by creating your first workout routine.
        </Text>
        <TouchableOpacity
          className="bg-red-500 px-6 py-3 rounded-xl"
          onPress={() => router.push("/(dashboard)/tasks/new")}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-center">
            Create First Workout
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Animated Header */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="px-6 pt-12 pb-6"
      >
        <View className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-200 border border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-red-500 w-12 h-12 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="fitness-outline" size={24} color="white" />
              </View>
              <View>
                <Text className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Your Workouts
                </Text>
                <Text className="text-gray-600 text-sm sm:text-base font-medium mt-1">
                  {task.length} {task.length === 1 ? "workout" : "workouts"} in
                  your routine
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Task List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {task.length === 0 ? (
          <EmptyState />
        ) : (
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}
          >
            {task.map((taskItem, index) => (
              <TaskCard key={taskItem.id} task={taskItem} index={index} />
            ))}
          </Animated.View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View
        style={{
          opacity: fabAnim,
          transform: [
            {
              scale: fabAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        }}
        className="absolute bottom-8 right-6"
      >
        <TouchableOpacity
          className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-2xl shadow-2xl shadow-red-500/40 items-center justify-center"
          activeOpacity={0.8}
          onPress={() => router.push("/(dashboard)/tasks/new")}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <View className="absolute top-32 right-8 w-24 h-24 bg-red-50 rounded-full opacity-30" />
      <View className="absolute bottom-32 left-4 w-16 h-16 bg-red-100 rounded-full opacity-20" />
    </View>
  );
};

export default TaskScreen;
