import {
  addTask,
  getTodos,
  getNewTaskRef,
  deleteTaskById,
  updateTask,
  deleteImage,
} from '../../utils/api';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useReducer } from 'react';
import {
  LOAD_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../actions-types';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  error: null,
  updating: {},
  entities: [],
};

function reducer(state, action) {
  switch (action.type) {
    case LOAD_TODOS + REQUEST:
      return {
        ...state,
        loading: true,
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
  createdAt: Timestamp.fromDate(new Date()),
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
        const data = await getTodos();
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
    updateTask: async (task) => {
      const oldTask = state.entities.find((item) => item.id === task.id);
      if (oldTask) {
        dispatch({
          type: UPDATE_TODO,
          updatedTask: {
            ...oldTask,
            ...task,
          },
        });
        try {
          await updateTask(task);
          toast.success('task updated successfully!');
        } catch (error) {
          toast.error('failed to update task (:');
          dispatch({
            type: UPDATE_TODO,
            updatedTask: oldTask,
          });
        }
      }
    },
    deleteTask: async (taskId) => {
      const task = state.entities.find(({ id }) => id === taskId);
      if (!task) return;
      const [imageId] = task.files;
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
