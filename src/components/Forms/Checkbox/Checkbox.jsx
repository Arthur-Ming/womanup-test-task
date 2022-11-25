import styles from "../forms.module.scss";

const Checkbox = ({ label = "", checked = false, onChange }) => {
  return (
    <label className={styles.label}>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
};

export default Checkbox;
