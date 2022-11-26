import { useReducer } from 'react';
import { deleteImage, uploadImage } from '../../utils/api';
import { LOAD_FILE, REQUEST, SUCCESS, FAILURE, RESET } from '../actions-types';

function reducer(state, action) {
  switch (action.type) {
    case LOAD_FILE + REQUEST:
      return {
        ...state,
        loading: true,
        id: '',
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
    case 'SET_IMAGE':
      return {
        ...state,
        id: action.imageURL,
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

const useImageUploader = (imageId = '') => {
  const [image, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    id: imageId,
  });

  return {
    image,
    onFileInput: async (e) => {
      const [file] = e.target.files;
      if (file) {
        dispatch({ type: LOAD_FILE + REQUEST });
        const id = await uploadImage(file);
        dispatch({ type: LOAD_FILE + SUCCESS, id: id.split('%')[1] });
      }
    },
    onDeleteFile: () => {
      image.id && deleteImage(image.id);
      dispatch({ type: RESET });
    },
  };
};

export default useImageUploader;
