import styles from '../forms.module.scss';
import PropTypes from 'prop-types';

const Checkbox = ({ label, checked, onChange }) => (
  <label className={styles.label}>
    <span>{label}</span>
    <input type="checkbox" checked={checked} onChange={onChange} />
  </label>
);

Checkbox.defaultProps = {
  label: '',
  checked: false,
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
