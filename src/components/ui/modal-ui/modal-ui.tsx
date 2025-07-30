import styles from "./modal-ui.module.scss";
import { ModalUIProps } from "./type";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

export const ModalUI: React.FC<ModalUIProps> = ({ onClose, children }) => {
  return createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()} // Останавливаем событие, чтобы клик внутри модалки не закрывал её
      >
        {children}
      </div>
    </div>,
    modalRoot!
  );
};
