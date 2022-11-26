import styles from "../index.module.scss";
import formatDate from "../../../../../utils/formatDate";
import InputDate from "../../../../Forms/InputDate";
import PropTypes from "prop-types";

const TaskDeadline = ({ deadline, isEditMode, control }) => {
  if (isEditMode)
    return (
      <InputDate name="deadline" control={control} defaultValue={deadline} />
    );
  return (
    <p className={styles.deadline}>
      <span>deadline:</span>
      <span>{(deadline && formatDate(deadline)) || `-`}</span>
    </p>
  );
};

TaskDeadline.propTypes = {
  deadline: PropTypes.number,
  isEditMode: PropTypes.bool.isRequired,
  control: PropTypes.object.isRequired,
};

export default TaskDeadline;
