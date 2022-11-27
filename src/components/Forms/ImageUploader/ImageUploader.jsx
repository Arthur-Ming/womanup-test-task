import styles from '../forms.module.scss';
import { getImageURL } from '../../../utils/api';
import PropTypes from 'prop-types';

const ImageUploader = ({ name, label, register, imageState, onFileInput, onDeleteFile }) => (
  <label
    className={styles.file_preview}
    style={{ backgroundImage: `url(${imageState.id && getImageURL(imageState.id)})` }}
    onClick={(e) => {
      if (imageState.id) {
        e.preventDefault();
        onDeleteFile();
      }
    }}
  >
    {!imageState.loading && !imageState.id && <span>{label}</span>}
    {imageState.loading && <span>Loaging...</span>}
    {imageState.id && <span>Delete image</span>}
    <input
      className={styles.file_input}
      type="file"
      accept="image/*"
      {...register(name)}
      onChange={onFileInput}
      disabled={imageState.loading}
    />
  </label>
);

ImageUploader.defaultProps = {
  label: '',
};

ImageUploader.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  imageState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    id: PropTypes.string.isRequired,
  }),
  onFileInput: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
};

export default ImageUploader;
