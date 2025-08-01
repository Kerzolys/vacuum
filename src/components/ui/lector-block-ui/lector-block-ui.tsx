import { useState } from "react";
import { TLector } from "../../../utils/types";
import styles from "./lector-block-ui.module.scss";
import { ModalUI } from "../modal-ui/modal-ui";
import { ButtonUI } from "../button-ui/button-ui";

type Props = {
  data: TLector;
};

export const LectorBlockUI = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => setIsOpen(true);

  return (
    <div className={styles.container}>
      <div onClick={handleOpenModal}>
        <div className={styles.container__img}>
          <img src={data.photo} alt={data.name} />
        </div>
        <h3>{data.name}</h3>
      </div>
      {isOpen && (
        <ModalUI onClose={handleCloseModal}>
          <div className={styles.content}>
            <div className={styles.content__img}>
              <img src={data.photo} alt={data.name} />
            </div>
            <div className={styles.content__info}>
              <h3>{data.name}</h3>
              <p>{data.description}</p>
              <ButtonUI buttonText="Закрыть" onClick={handleCloseModal} />
            </div>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
