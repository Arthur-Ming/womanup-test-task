import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const ModalRoot = ({ children }) => {
  if (!modalRoot) return <div>No modal root</div>;
  return createPortal(children, modalRoot);
};

export default ModalRoot;
