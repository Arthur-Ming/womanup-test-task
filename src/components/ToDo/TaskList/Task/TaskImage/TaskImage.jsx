import styles from '../index.module.scss';
import ImageUploader from '../../../../Forms/ImageUploader';
import { getImageURL } from '../../../../../utils/api';
import PropTypes from 'prop-types';

const TaskImage = ({ isEditMode, register, imageState, imageId, onFileInput, onDeleteFile }) => {
  if (isEditMode) {
    return (
      <ImageUploader
        name="image"
        label="Select file"
        register={register}
        onFileInput={onFileInput}
        onDeleteFile={onDeleteFile}
        imageState={imageState}
      />
    );
  }

  return (
    <a
      href={imageId && getImageURL(imageId)}
      className={styles.image_link}
      style={{ backgroundImage: `url(${imageId && getImageURL(imageId)})` }}
      target="_blank"
      onClick={(e) => {
        !imageId && e.preventDefault();
      }}
      rel="noreferrer"
    >
      {!imageId && <span>No image</span>}
    </a>
  );
};

TaskImage.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  onFileInput: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  imageState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    id: PropTypes.string.isRequired,
  }),
};

export default TaskImage;
