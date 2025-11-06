import { db } from "@/firebase";
import { Task } from "@/types/task";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import api from "./config/api";

export const getTask = async () => {
  const res = await api.get("/tasks");

  return res.data;
};

export const addTask = async (task: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

// task

export const getAllTask = async () => {
  const snapshot = await getDocs(taskRef);
  return snapshot.docs.map((task) => ({
    id: task.id,
    ...task.data(),
  })) as Task[];
};

export const getTaskId = async (id: string) => {
  const taskDocRef = doc(db, "tasks", id);
  const snapshot = await getDoc(taskDocRef);
  return snapshot.exists()
    ? ({
        id: snapshot.id,
        ...snapshot.data(),
      } as Task)
    : null;
};

export const deleteTask = async (id: string) => {
  if (!id) throw new Error("Task ID is required for deletion");
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};

export const taskRef = collection(db, "tasks");

export const createTask = async (task: Task) => {
  const docRef = await addDoc(taskRef, task);
  return docRef.id;
};

export const updateTask = async (id: string, task: Task) => {
  const updateRef = doc(db, "tasks", id);
  // Only update root fields
  return updateDoc(updateRef, {
    title: task.title,
    description: task.description,
  });
};
