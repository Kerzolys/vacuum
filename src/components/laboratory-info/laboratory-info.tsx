import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import vacuumCeamImg from "../../assets/lab/2J9A5330.webp";

import styles from "./laboratory-info.module.scss";
import { partners } from "../../utils/partnersInfo";
import { PartnerAccordeon } from "../ui/partner-accordion/partner-accordion";
import { lectors } from "../../utils/lectorsInfo";
import { LectorBlockUI } from "../ui/lector-block-ui/lector-block-ui";
import { composerResults, quartetResults } from "../../utils/results";
import { WinnerBlockUI } from "../ui/winner-block-ui/winner-block-ui";

export const LaboratoryInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <h3>
          Результаты приёма заявок на участие в лаборатории для композиторов и
          струнных квартетов — Vacuum Quartet Lab.
        </h3>
        <SectionLineUI />
        <div className={styles.container__results}>
          <div className={styles.container__results__composers}>
            {composerResults.map((c) => (
              <WinnerBlockUI data={c} key={c.id} />
            ))}
          </div>
          <div className={styles.container__results__quartets}>
            {quartetResults.map((q) => (
              <WinnerBlockUI data={q} key={q.id} />
            ))}
          </div>
          <div>
            <p className={styles.container__results__text}>
              Благодарим всех, кто подал заявку на опен-колл лаборатории! Мы
              невероятно рады большому интересу к нашему проекту, вдохновлены
              возможностью поделиться своими знаниями с молодыми музыкантами и с
              нетерпением ждем начала совместных творческих экспериментов!
            </p>
            <p className={styles.container__results__text}>
              Приглашаем всех посещать лекции и концерты Vacuum Quartet Lab в
              арт-пространстве «Артемьев». Расписание будет опубликовано на
              сайте и в соцсетях в ближайшее время.
            </p>
            <p className={styles.container__results__text}>
              Отобранные композиторы будут сочинять под руководством тьюторов, а
              в воплощении их нестандартных творческих замыслов им помогут
              инженеры Центра электроакустической музыки (ЦЭАМ). Струнные
              квартеты получат уникальный опыт работы с новыми сочинениями: на
              финальном концерте они исполнят акустические пьесы и мировые
              премьеры композиторов-участников.
            </p>
            <p className={styles.container__results__text}>
              Заключительный концерт лаборатории станет частью фестиваля Gnesin
              Contemporary Music Week.
            </p>
          </div>
        </div>
        <SectionLineUI />
        <p>
          Совместный проект струнного квартета Vacuum, Центра
          электроакустической музыки (ЦЭАМ) и фестиваля Gnesin Contemporary
          Music Week
        </p>
        <div className={styles.container__info}>
          <div>
            <p>
              Vacuum Quartet Lab — это интенсивная образовательная программа,
              посвящённая углублённому изучению принципов квартетного ансамбля,
              современной нотации, основ электроакустической и мультимедийной
              композиции, а также практическому взаимодействию композиторов и
              исполнителей с преподавателями и звукоинженерами.
            </p>
            <p>
              В период с 20 сентября по 30 октября участников ждут
              индивидуальные и групповые занятия, лекции, работа в студии Центра
              электроакустической музыки Московской консерватории (ЦЭАМ),
              создание нового сочинения и участие в финальном концерте на
              фестивале Gnesin Contemporary Music Week.
            </p>
          </div>
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
