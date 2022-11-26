import classNames from "classnames";
import styles from "../forms.module.scss";
import PropTypes from "prop-types";

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

Textarea.defaultProps = {
  label: "",
  defaultValue: "",
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.object,
};

export default Textarea;
