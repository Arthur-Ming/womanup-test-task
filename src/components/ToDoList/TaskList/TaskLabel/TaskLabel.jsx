import { AiFillDelete as RemoveIcon } from "react-icons/ai";
import { HiOutlineEye as RemoveIc } from "react-icons/hi";
import Checkbox from "../../../Forms/Checkbox";
import formatDate from "../../../../utils/formatDate";
import styles from "../index.module.scss";

formatDate();
const TaskLabel = ({ title, deadline, id, isDone, setSeletedTaskId }) => (
  <li className={styles.label}>
    <div className={styles.ch_box}>
      <Checkbox label="Done" checked={isDone} />
    </div>
    <div className={styles.link} onClick={() => setSeletedTaskId(id)}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.deadline}>{formatDate(deadline)}</p>
    </div>
    <div className={styles.remove_box}>
      <RemoveIcon className={styles.remove_icon} />
    </div>
  </li>
);
export default TaskLabel;
