import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const filesUrl =
  "https://firebasestorage.googleapis.com/v0/b/store-b1a8b.appspot.com/o/files";

const firebaseConfig = {
  apiKey: "AIzaSyAtJW10sBdbadLreAWzrVkNAxqxLDv9TJM",
  authDomain: "todo-8a2eb.firebaseapp.com",
  projectId: "todo-8a2eb",
  storageBucket: "todo-8a2eb.appspot.com",
  messagingSenderId: "61681984034",
  appId: "1:61681984034:web:532c953b27a84ce5c1e07b",
  measurementId: "G-TG12SW4VQ2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export const uploadFile = async (file) => {
  const mountainImagesRef = ref(storage, `${filesUrl}/${v4()}`);
  const snapshot = await uploadBytes(mountainImagesRef, file);
  const fileUrl = await getDownloadURL(snapshot.ref);
  return fileUrl;
};

export const getFile = (path) => `${filesUrl}%${path}`;

export const addTask = (task, newTaskRef) => setDoc(newTaskRef, task);

export const getNewTaskRef = () => {
  return doc(collection(db, "todos"));
};

export const getTodos = async () => {
  const todoCol = collection(db, "todos");
  const citySnapshot = await getDocs(todoCol);
  return citySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getTaskById = async (taskId) => {
  console.log(taskId);

  const todoCol = doc(db, "todos", taskId);
  const citySnapshot = await getDoc(todoCol);
  if (!citySnapshot.data()) {
    throw new Error("task not found!");
  }
  return {
    ...citySnapshot.data(),
    id: taskId,
  };
};

export const updateTask = async (task) => {
  /* return new Promise((res, rej) => {
    setTimeout(() => {
      rej("!!");
    }, 2000);
  }); */
  const washingtonRef = doc(db, "todos", task.id);
  await updateDoc(washingtonRef, task);
};

export const deleteImage = async (imageURL) => {
  const mountainImagesRef = ref(storage, `${filesUrl}%${imageURL}`);
  await deleteObject(mountainImagesRef);
};

export const deleteTaskById = async (taskId) => {
  const todoCol = doc(db, "todos", taskId);
  await deleteDoc(todoCol);
};
