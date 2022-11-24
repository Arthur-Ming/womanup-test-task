import styles from "../index.module.scss";
import Textarea from "../../../../Forms/Textarea";

const TaskDescription = ({ description, isEditMode, register }) => {
  if (isEditMode)
    return (
      <Textarea
        name="description"
        defaultValue={description}
        register={register}
      />
    );
  return (
    <p className={styles.description}>
      {description || `add a more detailed description...`}
    </p>
  );
};

export default TaskDescription;
