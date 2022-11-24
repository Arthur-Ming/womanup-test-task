import classNames from "classnames";
import styles from "../forms.module.scss";

const Textarea = ({
  name,
  label = "",
  register,
  error,
  required,
  defaultValue = "",
}) => (
  <label className={styles.label}>
    <span>{label}</span>
    <textarea
      className={classNames(styles.textarea, {
        [styles.invalid]: error,
      })}
      defaultValue={defaultValue}
      {...register(name, { required })}
    />
    {error && <span className={styles.invalid_text}>{error.message}</span>}
  </label>
);

export default Textarea;
