import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const ModalRoot = ({ children }) => {
  if (!modalRoot) return <div>No modal root</div>;
  return createPortal(children, modalRoot);
};

ModalRoot.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalRoot;
