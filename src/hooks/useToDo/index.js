import { uploadFile, addTask, getTodos, getNewTaskRef } from "../../utils/api";
import { Timestamp } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { LOAD_TODOS, REQUEST, SUCCESS, FAILURE } from "../actions-types";

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
      };
    default:
      throw new Error();
  }
}
const getNewTask = (data, files) => ({
  ...data,
  deadline: Number(new Date(data.deadline)) / 1000,
  createdAt: Timestamp.fromDate(new Date()),
  files,
});

const useTodo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fn() {
      try {
        dispatch({
          type: LOAD_TODOS + REQUEST,
        });
        const data = await getTodos();
        dispatch({
          type: LOAD_TODOS + SUCCESS,
          data,
        });
      } catch (error) {}
    }
    fn();
  }, []);
  return {
    state,
    createTask: async (data) => {
      const files = [];
      if (data.imageURL) {
        files.push(data.imageURL);
      }
      // const newTaskRef = getNewTaskRef();
      const newTask = getNewTask(data, files);
      console.log(newTask);
      // await addTask(newTask, newTaskRef);
    },
  };
};

export default useTodo;
