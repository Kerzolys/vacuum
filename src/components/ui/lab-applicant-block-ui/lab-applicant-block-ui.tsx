import { useState } from "react";
import {
  TComposerApplication,
  TStringQuartetApplication,
} from "../../../utils/types";
import styles from "./lab-applicant-block-ui.module.scss";
import { ModalUI } from "../modal-ui/modal-ui";
import { ButtonUI } from "../button-ui/button-ui";

type Props = {
  data: TComposerApplication | TStringQuartetApplication;
};

export const LabApplicantBlockUI = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        <div className={styles.container__img}>
          <img
            src={data.photo_url}
            alt={
              "composer_name" in data ? data.composer_name : data.quartet_name
            }
          />
        </div>
        <h3>
          {"composer_name" in data ? data.composer_name : data.quartet_name}
        </h3>
      </div>
      {isOpen && (
        <ModalUI onClose={handleClose}>
          <div className={styles.content}>
            <div className={styles.content__img}>
              <img
                src={data.photo_url}
                alt={
                  "composer_name" in data
                    ? data.composer_name
                    : data.quartet_name
                }
              />
            </div>
            <div className={styles.content__info}>
              <h3>
                {"composer_name" in data
                  ? data.composer_name
                  : data.quartet_name}
              </h3>
              <h3>Биография</h3>
              <p>{data.bio}</p>
              <h3>Ссылка на фото</h3>
              <p>{data.photo_url}</p>
              {"experience" in data && (
                <>
                  <h3>Опыт работы с электроакустическим инструментарием</h3>
                  <p>{data.experience}</p>
                </>
              )}

              {"members" in data && (
                <>
                  <h3>Состав квартета</h3>
                  <p>Первая скрипка: {data.members.first_violin_name}</p>
                  <p>Вторая скрипка: {data.members.second_violin_name}</p>
                  <p>Альт: {data.members.viola_name}</p>
                  <p>Виолончель: {data.members.cello_name}</p>
                </>
              )}
              <h3>Аудио/видео материалы</h3>
              {data.media_materials.map((a,i) => (
                <p key={a[i]}>{a}</p>
              ))}
              <h3>Откуда узнали о лаборатории</h3>
              <p>{data.source_of_discovery}</p>
              <h3>Мотивационное письмо</h3>
              <p>{data.motivation_letter}</p>
              <h3>Элетронный адрес</h3>
              <p>{data.email}</p>
              <ButtonUI buttonText="Закрыть" onClick={handleClose} />
            </div>
          </div>
        </ModalUI>
      )}
    </div>
  );
};
