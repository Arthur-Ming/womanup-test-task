import Modal from '../../../Modal';
import styles from './index.module.scss';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import PropTypes from 'prop-types';

const TaskWrapper = ({ children, onCloseClick }) => (
  <Modal onClickOutside={onCloseClick}>
    <div className={styles.box}>
      <CloseIcon className={styles.close_icon} onClick={onCloseClick} />
      {children}
    </div>
  </Modal>
);

TaskWrapper.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default TaskWrapper;
