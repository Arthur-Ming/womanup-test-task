import styles from "../index.module.scss";
import ImageUploader from "../../../../Forms/ImageUploader";
import { getFile } from "../../../../../utils/api";
import PropTypes from "prop-types";

const TaskImage = ({
  isEditMode,
  register,
  image,
  onFileInput,
  onDeleteFile,
}) => {
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
      href={image.url && getFile(image.url)}
      className={styles.image_link}
      style={{ backgroundImage: `url(${image.url && getFile(image.url)})` }}
      target="_blank"
      onClick={(e) => {
        !image.url && e.preventDefault();
      }}
      rel="noreferrer"
    >
      {image.url && (
        <img className={styles.image} src={getFile(image.url)} alt="" />
      )}
      {!image.url && <span>No image</span>}
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
    url: PropTypes.string.isRequired,
  }),
};

export default TaskImage;
