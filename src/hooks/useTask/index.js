import { useEffect, useReducer } from "react";
import { getTaskById } from "../../utils/api";
import { LOAD_TASK, REQUEST, SUCCESS, FAILURE } from "../actions-types";

const initialState = {
  loading: true,
  loaded: false,
  error: null,
  task: {},
};

function reducer(state, action) {
  switch (action.type) {
    case LOAD_TASK + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOAD_TASK + SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        task: action.data,
      };
    case LOAD_TASK + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      throw new Error();
  }
}

const useTask = (taskId) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fn = async () => {
      try {
        dispatch({
          type: LOAD_TASK + REQUEST,
        });
        const data = await getTaskById(taskId);
        dispatch({
          type: LOAD_TASK + SUCCESS,
          data,
        });
      } catch (error) {}
    };
    if (taskId) {
      fn();
    }
  }, [taskId]);

  return state;
};

export default useTask;
