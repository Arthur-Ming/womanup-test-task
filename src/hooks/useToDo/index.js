import { useEffect, useReducer } from 'react';
import {
  addTask,
  getTodos,
  getNewTaskRef,
  deleteTaskById,
  updateTask,
  deleteImage,
} from '../../utils/api';
import {
  LOAD_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../action-types';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  error: null,
  entities: [],
};

function reducer(state, action) {
  switch (action.type) {
    case LOAD_TODOS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_TODOS + SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.data,
      };
    case LOAD_TODOS + FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_TODO:
      return {
        ...state,
        entities: [...state.entities, action.data],
      };
    case UPDATE_TODO:
      return {
        ...state,
        entities: state.entities.map((todo) => {
          return todo.id === action.updatedTask.id ? action.updatedTask : todo;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        entities: state.entities.filter((todo) => todo.id !== action.taskId),
      };
    default:
      throw new Error();
  }
}
const getNewTask = (data, newTaskId) => ({
  ...data,
  id: newTaskId,
  isDone: false,
});

const useTodo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function queryFn() {
      try {
        dispatch({
          type: LOAD_TODOS + REQUEST,
        });
        const rawData = await getTodos();
        const data = rawData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({
          type: LOAD_TODOS + SUCCESS,
          data,
        });
      } catch (error) {
        dispatch({
          type: LOAD_TODOS + FAILURE,
          error,
        });
      }
    }
    queryFn();
  }, []);
  return {
    state,
    createTask: async (data) => {
      const newTaskRef = getNewTaskRef();
      const newTask = getNewTask(data, newTaskRef.id);
      dispatch({
        type: ADD_TODO,
        data: newTask,
      });
      try {
        await addTask(newTask, newTaskRef);
        toast.success('task created successfully!');
      } catch (error) {
        toast.error('failed to create task (:');
        dispatch({
          type: DELETE_TODO,
          taskId: newTaskRef.id,
        });
      }
    },
    updateTask: async (updatedTask) => {
      const oldTask = state.entities.find((item) => item.id === updatedTask.id);

      if (!oldTask) return;

      dispatch({
        type: UPDATE_TODO,
        updatedTask,
      });

      if (oldTask.image && !updatedTask.image) {
        deleteImage(oldTask.image);
      }
      try {
        await updateTask(updatedTask);
        toast.success('task updated successfully!');
      } catch (error) {
        toast.error('failed to update task (:');
        dispatch({
          type: UPDATE_TODO,
          updatedTask: oldTask,
        });
      }
    },
    deleteTask: async (taskId) => {
      const task = state.entities.find(({ id }) => id === taskId);

      if (!task) return;

      const imageId = task.image;
      dispatch({
        type: DELETE_TODO,
        taskId,
      });

      try {
        await deleteTaskById(taskId);
        imageId && deleteImage(imageId);
        toast.success('task deleted successfully!');
      } catch (error) {
        toast.error('failed to delete task (:');
      }
    },
  };
};

export default useTodo;
