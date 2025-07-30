import { LineUI } from "../ui/line-ui/line-ui";
import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import vacuumCeamImg from "../../assets/lab/2J9A5330.webp";

import styles from "./laboratory-info.module.scss";
import { partners } from "../../utils/partnersInfo";
import { PartnerAccordeon } from "../ui/partner-accordion/partner-accordion";
import { lectors } from "../../utils/lectorsInfo";
import { LectorBlockUI } from "../ui/lector-block-ui/lector-block-ui";

export const LaboratoryInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <SectionLineUI />
        <h3>
          Совместный проект струнного квартета Vacuum, Центра
          электроакустической музыки (ЦЭАМ) и фестиваля Gnesin Contemporary
          Music Week
        </h3>
        <div className={styles.container__info}>
          <p>
            Лаборатория для композиторов и исполнителей на струнно-смычковых
            инструментах. Основой проекта является глубокое изучение современной
            нотации, основ квартетного мастерства, погружение в принципы
            электроакустической и мультимедийной композиции. У участников курса
            появляется отличная возможность узнать о современных тенденциях в
            сфере академической музыки, испытать себя, познавая новые форматы и
            принципы взаимодействия с новыми технологиями, а также создать
            что-то новое при поддержке опытных специалистов.
          </p>
          <img src={vacuumCeamImg} alt="Vacuum Quartet & Biomechanics" />
        </div>
        <SectionLineUI isForward={false} />
        <div className={styles.container__partners}>
          <h3>Партнеры проекта</h3>
          <div className={styles.container__partners__partners}>
            {partners.map((p) => (
              <PartnerAccordeon data={p} key={p.id} />
            ))}
          </div>
        </div>
        <SectionLineUI />
        <div className={styles.container__lectors}>
          <h3>Педагоги и кураторы</h3>
          <div className={styles.container__lectors__lectors}>
            {lectors.map((l) => (
              <LectorBlockUI data={l} key={l.id} />
            ))}
          </div>
        </div>
        <SectionLineUI isForward={false} />
      </div>
    </div>
  );
};
