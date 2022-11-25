import Modal from "../Modal";
import styles from "./index.module.scss";

const ConfirmPopup = ({ message, onDidConfirm, onDidNotConfirm }) => (
  <Modal>
    <div className={styles.box}>
      <h5>{message}</h5>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={onDidNotConfirm}>
          No
        </button>
        <button className={styles.button} onClick={onDidConfirm}>
          Yes
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmPopup;
