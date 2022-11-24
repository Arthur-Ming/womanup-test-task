import styles from "../index.module.scss";
import InputText from "../../../../Forms/InputText";

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

export default TaskTitle;
