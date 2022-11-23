import { useReducer } from "react";
import { uploadFile } from "../../utils/api";
import { LOAD_FILE, REQUEST, SUCCESS, FAILURE, RESET } from "../actions-types";

const initialState = {
  loading: false,
  error: null,
  url: "",
};

function reducer(state, action) {
  switch (action.type) {
    case LOAD_FILE + REQUEST:
      return {
        ...state,
        loading: true,
        url: "",
      };
    case LOAD_FILE + SUCCESS:
      return {
        ...state,
        loading: false,
        url: action.url,
      };
    case LOAD_FILE + FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case RESET:
      return {
        loading: false,
        url: "",
        error: null,
      };
    default:
      throw new Error();
  }
}

const useImageUploader = () => {
  const [image, dispatch] = useReducer(reducer, initialState);
  return {
    image,
    onFileInput: async (e) => {
      const [file] = e.target.files;
      if (file) {
        dispatch({ type: LOAD_FILE + REQUEST });
        const url = await uploadFile(file);
        dispatch({ type: LOAD_FILE + SUCCESS, url: url.split("%")[1] });
      }
    },
    resetImage: () => dispatch({ type: RESET }),
    onDeleteFile: () => {
      dispatch({ type: RESET });
    },
  };
};

export default useImageUploader;
