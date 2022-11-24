import styles from "../forms.module.scss";

const Checkbox = ({ label = "", checked = false }) => {
  return (
    <label className={styles.label}>
      <span>{label}</span>
      <input type="checkbox" checked={checked} />
    </label>
  );
};

export default Checkbox;
