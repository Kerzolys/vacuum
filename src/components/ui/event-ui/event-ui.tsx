import styles from './event-ui.module.scss'
import { EventUIProps } from './type'

export const EventUI: React.FC<EventUIProps> = ({ event }) => {
  return <div className={styles.event}>
    <div className={styles.event__info}>
      <h3 className={styles.event__info__date}>{event.date}</h3>
      <p className={styles.event__info__time}>{event.time}</p>
    </div>
    <div className={styles.event__content}>
      <h2 className={styles.event__content__title}>{event.title}</h2>
      <p className={styles.event__content__description}>{event.program}</p>
      <p className={styles.event__content__location}>{event.location}</p>
      <p className={styles.event__content__link}>{event.link}</p>
    </div>
  </div>
}