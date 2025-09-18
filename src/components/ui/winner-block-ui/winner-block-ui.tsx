import { useState } from "react";
import { TWinner } from "../../../utils/types";
import styles from "./winner-block-ui.module.scss";
import { ModalUI } from "../modal-ui/modal-ui";
import { ButtonUI } from "../button-ui/button-ui";

type Props = {
  data: TWinner;
};

export const WinnerBlockUI = ({ data }: Props) => {
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
              {data.name && <h3>{data.name}</h3>}
              <p>{data.bio}</p>
              {data.members && data.members.map((m) => <p>{m}</p>)}
              <ButtonUI buttonText="Закрыть" onClick={handleCloseModal} />
            </div>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
