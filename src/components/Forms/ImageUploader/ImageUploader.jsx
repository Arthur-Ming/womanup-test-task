import styles from "../forms.module.scss";
import { getFile } from "../../../utils/api";
import PropTypes from "prop-types";

const ImageUploader = ({
  name,
  label,
  register,
  image,
  onFileInput,
  onDeleteFile,
}) => {
  return (
    <label
      className={styles.file_preview}
      style={{ backgroundImage: `url(${image.url && getFile(image.url)})` }}
      onClick={(e) => {
        if (image.url) {
          e.preventDefault();
          onDeleteFile();
        }
      }}
    >
      {!image.loading && !image.url && <span>{label}</span>}
      {image.loading && <span>Loaging...</span>}
      {image.url && <span>Delete image</span>}
      <input
        className={styles.file_input}
        type="file"
        accept="image/*"
        {...register(name)}
        onChange={onFileInput}
        disabled={image.loading}
      />
    </label>
  );
};

ImageUploader.defaultProps = {
  label: "",
};

ImageUploader.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  image: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    url: PropTypes.string.isRequired,
  }),
  onFileInput: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
};

export default ImageUploader;
