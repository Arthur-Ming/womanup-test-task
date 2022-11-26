import styles from "../index.module.scss";
import InputText from "../../../../Forms/InputText";
import PropTypes from "prop-types";

const TaskTitle = ({ title, isEditMode, register, error }) => {
  if (isEditMode)
    return (
      <InputText
        name="title"
        defaultValue={title}
        register={register}
        error={error}
        required="this field is required!"
      />
    );

  return <h4 className={styles.title}>{title}</h4>;
};

TaskTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default TaskTitle;
