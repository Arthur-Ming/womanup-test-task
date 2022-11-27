import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import { HiOutlineEye as EyeIcon } from 'react-icons/hi';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TaskType } from '../../../../types';
import Checkbox from '../../../Forms/Checkbox';
import ConfirmPopup from '../../../ConfirmPopup';
import formatDate from '../../../../utils/formatDate';
import styles from './index.module.scss';
import { useState } from 'react';

const TaskLabel = ({ task, setSeletedTaskId, deleteTask, updateTask }) => {
  const [isDeleteTaskMode, setDeleteTaskMode] = useState(false);
  const { title, deadline, id, isDone } = task;
  const onIsDoneStateChange = (event) =>
    updateTask({
      ...task,
      isDone: event.target.checked,
    });
  return (
    <li
      className={classNames(styles.label, {
        [styles.dead]: !task.isDone && task.deadline && task.deadline < Number(new Date()),
        [styles.done]: task.isDone,
      })}
    >
      <div className={styles.ch_box}>
        <Checkbox label="Done" checked={isDone} onChange={onIsDoneStateChange} />
      </div>
      <div className={styles.link} onClick={() => setSeletedTaskId(id)}>
        <div className={styles.text}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.deadline}>deadline: {deadline ? formatDate(deadline) : '-'}</p>
        </div>
        <EyeIcon />
      </div>
      <div className={styles.remove_box}>
        <RemoveIcon className={styles.remove_icon} onClick={() => setDeleteTaskMode(true)} />
      </div>
      {isDeleteTaskMode && (
        <ConfirmPopup
          message="Are you sure?"
          onDidConfirm={() => deleteTask(id)}
          onDidNotConfirm={() => setDeleteTaskMode(false)}
        />
      )}
    </li>
  );
};

TaskLabel.propTypes = {
  task: TaskType.isRequired,
  setSeletedTaskId: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskLabel;
