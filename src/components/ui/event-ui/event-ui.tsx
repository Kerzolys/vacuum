import { useTranslation } from "react-i18next";
import styles from "./event-ui.module.scss";
import type { EventUIProps } from "./type";

export const EventUI: React.FC<EventUIProps> = ({ event }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "ru" | "en";

  return (
    <div className={styles.event}>
      <div className={styles.event__info}>
        <h2 className={styles.event__content__location}>
          {event.location?.[lang]}
        </h2>
        <h3 className={styles.event__info__date}>{event.date}</h3>
        <p className={styles.event__info__time}>{event.time}</p>
      </div>
      <div className={styles.event__content}>
        <h2 className={styles.event__content__title}>{event.title?.[lang]}</h2>
        {event.program[lang].map((item) => (
          <p className={styles.event__content__description}>{item}</p>
        ))}

        <a
          className={styles.event__content__link}
          href={event.link}
          target="_blank"
          rel="noreferrer"
        >
          {t("more")}
        </a>
      </div>
    </div>
  );
};
