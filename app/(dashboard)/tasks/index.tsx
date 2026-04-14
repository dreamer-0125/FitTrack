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
        <View className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-soft border border-white/60">
          {/* Card Header with Icon */}
          <View className="flex-row items-start mb-4">
            <View className="bg-gradient-to-br from-primary-100 to-primary-200 w-12 h-12 rounded-2xl items-center justify-center mr-4 flex-shrink-0">
              <Ionicons name="barbell-outline" size={22} color="#dc2626" />
            </View>
            <View className="flex-1 min-w-0">
              <Text className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                {task.title}
              </Text>
              {task.description && (
                <Text className="text-gray-700 text-base leading-relaxed">
                  {task.description}
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-end space-x-4 pt-4 border-t border-gray-100">
            <TouchableOpacity
              className="flex-row items-center bg-gradient-to-r from-gray-50 to-white px-4 py-2.5 rounded-xl border border-gray-200"
              onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="edit" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700 font-semibold text-sm">
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-gradient-to-r from-primary-50 to-primary-100/50 px-4 py-2.5 rounded-xl border border-primary-200"
              onPress={() => {
                console.log("Deleting task:", task.id);
                handelDelete(task.id || "");
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="delete-outline" size={20} color="#dc2626" />
              <Text className="ml-2 text-primary-600 font-semibold text-sm">
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
      <View className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 shadow-soft border border-white/60 mx-4">
        <View className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full items-center justify-center mx-auto mb-6">
          <Ionicons name="barbell-outline" size={32} color="#dc2626" />
        </View>
        <Text className="text-xl font-bold text-gray-900 text-center mb-3">
          No Workouts Yet
        </Text>
        <Text className="text-gray-700 text-center text-base leading-relaxed mb-6">
          Start your fitness journey by creating your first workout routine.
        </Text>
        <TouchableOpacity
          className="px-6 py-3 rounded-xl"
          onPress={() => router.push("/(dashboard)/tasks/new")}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#dc2626',
            shadowColor: '#dc2626',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <Text className="text-white font-semibold text-center">
            Create First Workout
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Animated Header */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="px-6 pt-12 pb-6"
      >
        <View className="bg-white/90 backdrop-blur-xl rounded-4xl p-6 shadow-soft border border-white/60">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-gradient-to-br from-primary-500 to-primary-700 w-14 h-14 rounded-3xl items-center justify-center mr-4 shadow-medium">
                <Ionicons name="fitness-outline" size={26} color="white" />
              </View>
              <View>
                <Text className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  Your Workouts
                </Text>
                <Text className="text-gray-700 text-sm sm:text-base font-medium mt-1">
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
          className="w-16 h-16 rounded-3xl items-center justify-center"
          activeOpacity={0.8}
          onPress={() => router.push("/(dashboard)/tasks/new")}
          style={{
            backgroundColor: '#dc2626',
            shadowColor: '#dc2626',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
          }}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <View className="absolute top-32 right-8 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-3xl" />
      <View className="absolute bottom-32 left-4 w-24 h-24 bg-accent-200 rounded-full opacity-15 blur-3xl" />
    </View>
  );
};

export default TaskScreen;
