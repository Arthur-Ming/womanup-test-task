import { useReducer } from 'react';
import { deleteImage, uploadImage } from '../../utils/api';
import { LOAD_FILE, REQUEST, SUCCESS, FAILURE, RESET, SET_IMAGE } from '../action-types';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  error: null,
  id: '',
};

function reducer(state, action) {
  switch (action.type) {
    case LOAD_FILE + REQUEST:
      return {
        loading: true,
        id: '',
        error: null,
      };
    case LOAD_FILE + SUCCESS:
      return {
        ...state,
        loading: false,
        id: action.id,
      };
    case LOAD_FILE + FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_IMAGE:
      return {
        ...state,
        id: action.imageId,
      };
    case RESET:
      return {
        loading: false,
        id: '',
        error: null,
      };
    default:
      throw new Error();
  }
}

const useImageUploader = () => {
  const [imageState, dispatch] = useReducer(reducer, initialState);

  return {
    imageState,
    onFileInput: async (e) => {
      const [file] = e.target.files;
      if (file) {
        dispatch({ type: LOAD_FILE + REQUEST });

        try {
          const id = await uploadImage(file);
          toast.success('image uploaded successfully!');
          dispatch({ type: LOAD_FILE + SUCCESS, id: id.split('%')[1] });
        } catch (error) {
          toast.error('failed to upload image(:');
          dispatch({ type: LOAD_FILE + FAILURE, error });
        }
      }
    },
    onDeleteFile: () => {
      imageState.id && deleteImage(imageState.id);
      dispatch({ type: RESET });
    },
    onResetFile: () => {
      dispatch({ type: RESET });
    },
    setImage: (imageId) => {
      dispatch({ type: SET_IMAGE, imageId });
    },
  };
};

export default useImageUploader;
