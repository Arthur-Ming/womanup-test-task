import Modal from "../../../Modal";
import styles from "./index.module.scss";
import { IoMdClose as CloseIcon } from "react-icons/io";

const TaskWrapper = ({ children, onCloseClick }) => (
  <Modal onClickOutside={onCloseClick}>
    <div className={styles.box}>
      <CloseIcon className={styles.close_icon} onClick={() => onCloseClick()} />
      {children}
    </div>
  </Modal>
);

export default TaskWrapper;
