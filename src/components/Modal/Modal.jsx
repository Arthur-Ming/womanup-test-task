import styles from "./index.module.scss";
import cn from "classnames";
import { useRef } from "react";
import ModalRoot from "./ModalRoot";
import PropTypes from "prop-types";

const Modal = ({ children, onClickOutside }) => {
  const modalWrapperRef = useRef(null);

  const handleClick = (event) => {
    if (modalWrapperRef.current === event.target && onClickOutside) {
      onClickOutside();
    }
  };

  return (
    <ModalRoot>
      <div
        className={cn(styles.wrapper)}
        ref={modalWrapperRef}
        onClick={handleClick}
      >
        {children}
      </div>
    </ModalRoot>
  );
};

Modal.propTypes = {
  onClickOutside: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default Modal;
