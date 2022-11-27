import Loader from '../../Loader';
import PropTypes from 'prop-types';
import TaskLabel from './TaskLabel';
import { TaskType } from '../../../types';
import styles from './index.module.scss';

const TaskList = ({ tasks, tasksLoading, setSeletedTaskId, deleteTask, updateTask }) => {
  if (tasksLoading) return <Loader />;
  if (!tasks.length) return <p className={styles.no_task}>There is no one task</p>;
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskLabel
          key={task.id}
          task={task}
          setSeletedTaskId={setSeletedTaskId}
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
