import Modal from '../Modal';
import styles from './index.module.scss';
import PropTypes from 'prop-types';

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

ConfirmPopup.propTypes = {
  message: PropTypes.string.isRequired,
  onDidConfirm: PropTypes.func.isRequired,
  onDidNotConfirm: PropTypes.func.isRequired,
};

export default ConfirmPopup;
