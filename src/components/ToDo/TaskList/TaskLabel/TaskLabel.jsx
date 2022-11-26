import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import { HiOutlineEye as EyeIcon } from 'react-icons/hi';
import PropTypes from 'prop-types';
import Checkbox from '../../../Forms/Checkbox';
import ConfirmPopup from '../../../ConfirmPopup';
import formatDate from '../../../../utils/formatDate';
import styles from './index.module.scss';
import { useState } from 'react';

const TaskLabel = ({ title, deadline, id, isDone, setSeletedTaskId, deleteTask, updateTask }) => {
  const [isDeleteTaskMode, setDeleteTaskMode] = useState(false);
  const onIsDoneStateChange = (e) =>
    updateTask({
      id,
      isDone: e.target.checked,
    });
  return (
    <li className={styles.label}>
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
  title: PropTypes.string.isRequired,
  deadline: PropTypes.number,
  id: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setSeletedTaskId: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskLabel;
