import classNames from 'classnames';
import styles from '../forms.module.scss';
import PropTypes from 'prop-types';

const InputText = ({ name, register, error, required, label, defaultValue }) => (
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

InputText.defaultProps = {
  label: '',
  defaultValue: '',
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.object,
};

export default InputText;
