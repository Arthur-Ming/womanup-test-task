import Loader from "../../Loader";
import PropTypes from "prop-types";
import TaskLabel from "./TaskLabel";
import { TaskType } from "../../../types";
import styles from "./index.module.scss";

const TaskList = ({
  tasks,
  tasksLoading,
  setSeletedTaskId,
  deleteTask,
  updateTask,
}) => {
  if (tasksLoading) return <Loader />;
  return (
    <ul className={styles.list}>
      {tasks.map(({ id, title, deadline, isDone }) => (
        <TaskLabel
          key={id}
          title={title}
          deadline={deadline}
          id={id}
          setSeletedTaskId={setSeletedTaskId}
          isDone={isDone}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(TaskType.isRequired).isRequired,
  tasksLoading: PropTypes.bool.isRequired,
  setSeletedTaskId: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;
