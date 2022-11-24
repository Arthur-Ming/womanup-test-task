import styles from "../forms.module.scss";
import { getFile } from "../../../utils/api";

const ImageUploader = ({
  name,
  label,
  register,
  image,
  onFileInput,
  onDeleteFile,
}) => {
  console.log(getFile(image.url));
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

export default ImageUploader;
