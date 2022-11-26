import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import { initializeApp } from 'firebase/app';

/** firebase сonfig */
const firebaseConfig = {
  apiKey: 'AIzaSyAtJW10sBdbadLreAWzrVkNAxqxLDv9TJM',
  authDomain: 'todo-8a2eb.firebaseapp.com',
  projectId: 'todo-8a2eb',
  storageBucket: 'todo-8a2eb.appspot.com',
  messagingSenderId: '61681984034',
  appId: '1:61681984034:web:532c953b27a84ce5c1e07b',
  measurementId: 'G-TG12SW4VQ2',
};

export const initApp = initializeApp(firebaseConfig);
const db = getFirestore(initApp);

/**
 * Добавляет новую задачу в db
 * @param {Object} task - новая задача
 * @param {Object} newTaskRef - ссылка для новой задачи
 */

export const addTask = async (task, newTaskRef) => {
  await setDoc(newTaskRef, task);
};

/**
 * Создает ссылку на новый документ в db
 */

export const getNewTaskRef = () => {
  return doc(collection(db, 'todos'));
};

/**
 * Позволяет получить все задачи из db
 * @return {Array} - массив задач
 */

export const getTodos = async () => {
  const todoCol = collection(db, 'todos');
  const citySnapshot = await getDocs(todoCol);
  return citySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

/**
 * Обновляет задачу
 * @param {Object} task - новая задача
 */

export const updateTask = async (task) => {
  const washingtonRef = doc(db, 'todos', task.id);
  await updateDoc(washingtonRef, task);
};

/**
 * Удаляет задачу
 * @param {string} taskId - id задачи
 */

export const deleteTaskById = async (taskId) => {
  const todoCol = doc(db, 'todos', taskId);
  await deleteDoc(todoCol);
};

const storage = getStorage();

/** URL адрес API */
const BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/store-b1a8b.appspot.com/o/files';

/**
 * Возвращает ссылку на изображение по ID
 * @param {string} id - ID изображения
 * @return {string} - ссылка на изображение
 */

export const getImageURL = (id) => `${BASE_URL}%${id}`;

/**
 * Возвращает ссылку на изображение по ID
 * @param id - ID изображения
 * @return {string} - ссылка на изображение
 */

export const uploadImage = async (file) => {
  const mountainImagesRef = ref(storage, `${BASE_URL}/${v4()}`);
  const snapshot = await uploadBytes(mountainImagesRef, file);
  const imageUrl = await getDownloadURL(snapshot.ref);
  return imageUrl;
};

export const deleteImage = async (imageId) => {
  const mountainImagesRef = ref(storage, `${BASE_URL}%${imageId}`);
  await deleteObject(mountainImagesRef);
};
