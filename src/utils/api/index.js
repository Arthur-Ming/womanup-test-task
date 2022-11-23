import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

dayjs.extend(localizedFormat);

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

dayjs("2018-08-08"); // parse

dayjs.extend(localizedFormat);

export const uploadFile = async (file) => {
  const mountainImagesRef = ref(storage, `${filesUrl}/${v4()}`);
  const snapshot = await uploadBytes(mountainImagesRef, file);
  const fileUrl = await getDownloadURL(snapshot.ref);
  return fileUrl;
};

export const getFile = (path) => `${filesUrl}%${path}`;

export const addTask = async (task, newTaskRef) => {
  const docRef = await setDoc(newTaskRef, task);
  /*  const docRef = await addDoc(collection(db, "todos"), task);
  return docRef; */
};

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

/* {
  title: "Losbb Angeles",
  description: "CAbfb",
  deadline: 515151151,
  isDone: false,
  createdAt: Timestamp.fromDate(new Date()),
  files: ["vvr"],
}
 */
/* const todoCol = collection(db, "todos");
const citySnapshot = await getDocs(todoCol);
const cityList = citySnapshot.docs.map((doc) => ({
  ...doc.data(),
  id: doc.id,
}));

return cityList; */
