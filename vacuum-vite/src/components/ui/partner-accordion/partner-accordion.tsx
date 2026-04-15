import { useState } from "react";
import { ButtonUI } from "../button-ui/button-ui";
import styles from "./partner-accordion.module.scss";
import { TPartner } from "../../../utils/types";

type Props = {
  data: TPartner;
};

export const PartnerAccordeon = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleAccordeon = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.container__img}>
        <img src={data.photo} alt={`logo ${data.name}`} />
      </div>
      {isOpen && (
        <div>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
        </div>
      )}
      <ButtonUI
        buttonText={isOpen ? "Свернуть" : "Подробнее"}
        onClick={toggleAccordeon}
      />
    </div>
  );
};
