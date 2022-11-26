import styles from '../index.module.scss';
import ImageUploader from '../../../../Forms/ImageUploader';
import { getImageURL } from '../../../../../utils/api';
import PropTypes from 'prop-types';

const TaskImage = ({ isEditMode, register, image, onFileInput, onDeleteFile }) => {
  if (isEditMode) {
    return (
      <ImageUploader
        name="files"
        label="Select file"
        register={register}
        onFileInput={onFileInput}
        onDeleteFile={onDeleteFile}
        image={image}
      />
    );
  }

  return (
    <a
      href={image.id && getImageURL(image.id)}
      className={styles.image_link}
      style={{ backgroundImage: `url(${image.id && getImageURL(image.id)})` }}
      target="_blank"
      onClick={(e) => {
        !image.id && e.preventDefault();
      }}
      rel="noreferrer"
    >
      {image.id && (
        <img className={styles.image} src={getImageURL(image.id)} alt="" loading="lazy" />
      )}
      {!image.id && <span>No image</span>}
    </a>
  );
};

TaskImage.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  onFileInput: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  image: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    id: PropTypes.string.isRequired,
  }),
};

export default TaskImage;
