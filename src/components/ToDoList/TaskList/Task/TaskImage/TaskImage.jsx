import useImageUploader from "../../../../../hooks/useImageUploader";
import styles from "../index.module.scss";
import ImageUploader from "../../../../Forms/ImageUploader";
import { getFile } from "../../../../../utils/api";

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
  console.log(image);
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
        <img
          className={styles.image}
          src={image.url && getFile(image.url)}
          alt=""
        />
      )}
      {!image.url && <span>No image</span>}
    </a>
  );
};

export default TaskImage;
