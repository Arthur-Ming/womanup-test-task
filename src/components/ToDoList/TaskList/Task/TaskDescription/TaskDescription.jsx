import styles from "../index.module.scss";
import Textarea from "../../../../Forms/Textarea";
import PropTypes from "prop-types";

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

TaskDescription.propTypes = {
  description: PropTypes.string,
  isEditMode: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

export default TaskDescription;
