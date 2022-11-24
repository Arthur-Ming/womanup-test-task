import classNames from "classnames";
import styles from "../forms.module.scss";

const InputText = ({
  name,
  register,
  error,
  required,
  label = "",
  defaultValue = "",
}) => (
  <label className={styles.label}>
    <span>{label}</span>
    <input
      className={classNames(styles.input, {
        [styles.invalid]: error,
      })}
      type="text"
      defaultValue={defaultValue}
      {...register(name, { required })}
    />
    {error && <span className={styles.invalid_text}>{error.message}</span>}
  </label>
);

export default InputText;
